/** beans: begin */
export * from '../bean/themeHandler.default.js';
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'devui-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiAdapter extends BeanScopeBase {}

export interface ScopeModuleDevuiAdapter {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-adapter': ScopeModuleDevuiAdapter;
  }
}

/** scope: end */
/** scope module: begin */
export * from '../bean/themeHandler.default.js';
declare module 'zova-module-devui-adapter' {
  export interface ThemeHandlerDefault {
    /** @internal */
    get scope(): ScopeModuleDevuiAdapter;
  }
}
/** scope module: end */
