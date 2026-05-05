import 'zova-jsx';
import { IActionRecord } from 'zova-module-a-action';

import { IPerformActionRecord } from './performAction.js';

declare module 'zova-jsx' {
  export interface ZovaJsx {
    normalizeAction(type: keyof IPerformActionRecord): keyof IActionRecord;
  }
}
