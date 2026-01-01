import type { IMonkeySysClose, IMonkeySysReady } from 'zova';
import { WebSocketClient } from '@cabloy/socket';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysReady, IMonkeySysClose {
  private _ws?: WebSocketClient;

  async sysReady(): Promise<void> {
    if (this.sys.env.SSR_HMR !== 'true') return;
    this._startWs();
  }

  sysClose(): void {
    if (this.sys.env.SSR_HMR !== 'true') return;
    this._closeWs();
  }

  private _closeWs() {
    if (this._ws) {
      this._ws.disconnect();
      this._ws = undefined;
    }
  }

  private _startWs() {
    const ws = this._ws = new WebSocketClient({ reconnectDelayMax: 1000 });
    ws.onEvent = (eventName, _data) => {
      if (eventName === 'a-ssrhmr:reload') {
        this._reload();
      }
    };
    ws.onOpen = (_event, reconnectAttempts) => {
      if (reconnectAttempts > 0) {
        this._reload();
      }
    };
    // connect
    const url = `${this.sys.config.ws.baseURL}${this.sys.config.ws.prefix}/ssrhmr`;
    ws.connect(url);
  }

  private async _reload() {
    await this.sys.meta.event.emit('a-ssrhmr:reloadSysSdk');
    await this.sys.meta.event.emit('a-ssrhmr:reloadModelSdk');
  }
}
