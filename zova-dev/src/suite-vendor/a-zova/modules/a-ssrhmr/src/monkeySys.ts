import type { IMonkeySysClose, IMonkeySysReady } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysReady, IMonkeySysClose {
  async sysReady(): Promise<void> {
    if (this.sys.env.SSR_HMR !== 'true') return;
    console.log('-----------ssr hmr ready', new Date());
  }

  async sysClose(): Promise<void> {
    if (this.sys.env.SSR_HMR !== 'true') return;
    console.log('-----------ssr hmr close', new Date());
  }
}
