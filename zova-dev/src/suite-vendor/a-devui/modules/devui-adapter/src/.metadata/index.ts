/** themeHandler: begin */
export * from '../bean/themeHandler.default.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-devui-adapter' {
  export interface ThemeHandlerDefault {
    /** @internal */
    get scope(): ScopeModuleDevuiAdapter;
  }
}
/** themeHandler: end */
/** themeHandler: begin */
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** themeHandler: end */
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
