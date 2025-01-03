/** meta: begin */
export * from '../bean/meta.themeHandler.js';

import 'zova';
declare module 'zova' {
  export interface IMetaRecord {
    'devui-adapter:themeHandler': never;
  }
}
declare module 'zova-module-devui-adapter' {
  export interface MetaThemeHandler {
    /** @internal */
    get scope(): ScopeModuleDevuiAdapter;
  }
}
/** meta: end */
/** meta: begin */
import { MetaThemeHandler } from '../bean/meta.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-adapter.meta.themeHandler': MetaThemeHandler;
  }
}
/** meta: end */
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
