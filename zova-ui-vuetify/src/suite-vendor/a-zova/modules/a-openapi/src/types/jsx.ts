import type { IActionsRecord } from 'zova-module-a-action';

import type { TypeActionProvider } from './action.js';
import 'zova-jsx';

declare module 'zova-jsx' {
  export interface ZovaJsx {
    normalizeAction(type: keyof IActionsRecord): TypeActionProvider;
  }
}
