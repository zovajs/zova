import { BeanBase, cast, ILocaleRecord } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { SSRContextState, SSRContextStateDefer } from '../types/ssr.js';

const SymbolSSRState = Symbol('SymbolSSRState');
const SymbolSSRStateDefer = Symbol('SymbolSSRStateDefer');

@Sys()
export class SysSsrState extends BeanBase {
  protected [SymbolSSRState]: SSRContextState;
  protected [SymbolSSRStateDefer]: SSRContextStateDefer;

  protected async __init__() {
    if (process.env.CLIENT) {
      if (cast(window).__INITIAL_STATE__) {
        this[SymbolSSRState] = cast(window).__INITIAL_STATE__;
        delete cast(window).__INITIAL_STATE__;
        document.getElementById('ssr-state-init')?.remove();
        this._patchEnvConfig();
      } else {
        this[SymbolSSRState] = {};
      }
      if (cast(window).__INITIAL_STATE_DEFER__) {
        this[SymbolSSRStateDefer] = cast(window).__INITIAL_STATE_DEFER__;
        delete cast(window).__INITIAL_STATE_DEFER__;
        document.getElementById('ssr-state-defer-init')?.remove();
      } else {
        this[SymbolSSRStateDefer] = {} as any;
      }
    }
  }

  private _patchEnvConfig() {
    // env
    this.sys.env = Object.assign({}, this.sys.env, this.state.envClient);
    // config
    this.sys.config.app.name = this.sys.env.APP_NAME!;
    this.sys.config.app.title = this.sys.env.APP_TITLE!;
    this.sys.config.app.description = this.sys.env.APP_DESCRIPTION!;
    this.sys.config.app.version = this.sys.env.APP_VERSION!;
    this.sys.config.locale.default = this.sys.env.APP_LOCALE_DEFAULT as keyof ILocaleRecord;
  }

  get state() {
    return this[SymbolSSRState];
  }

  get stateDefer() {
    return this[SymbolSSRStateDefer];
  }
}
