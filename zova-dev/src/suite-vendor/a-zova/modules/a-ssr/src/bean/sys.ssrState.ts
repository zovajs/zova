import { BeanBase, cast } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { SSRContextState, SSRContextStateDefer } from '../types/ssr.js';

const SymbolSSRState = Symbol('SymbolSSRState');
const SymbolSSRStateDefer = Symbol('SymbolSSRStateDefer');

@Sys()
export class SysSsrState extends BeanBase {
  private [SymbolSSRState]: SSRContextState;
  private [SymbolSSRStateDefer]: SSRContextStateDefer;

  protected async __init__() {
    // SymbolSSRState
    if (process.env.CLIENT) {
      if (cast(window).__INITIAL_STATE__) {
        this[SymbolSSRState] = cast(window).__INITIAL_STATE__;
        delete cast(window).__INITIAL_STATE__;
        document.getElementById('ssr-state-init')?.remove();
        Object.assign(this.sys.env, this[SymbolSSRState].envClient);
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

  get state() {
    return this[SymbolSSRState];
  }

  get stateDefer() {
    return this[SymbolSSRStateDefer];
  }
}
