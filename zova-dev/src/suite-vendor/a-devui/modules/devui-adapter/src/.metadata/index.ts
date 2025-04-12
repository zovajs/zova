import type { BeanScopeUtil } from 'zova';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** meta: end */
/** meta: begin */
import { MetaThemeHandler } from '../bean/meta.themeHandler.js';
/** meta: begin */
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/meta.themeHandler.js';
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
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-adapter.meta.themeHandler': MetaThemeHandler;
  }
}
/** meta: end */
/** monkeySys: begin */
export * from '../monkeySys.js';

@Scope()
export class ScopeModuleDevuiAdapter extends BeanScopeBase {}

export interface ScopeModuleDevuiAdapter {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-adapter': ScopeModuleDevuiAdapter;
  }

}

/** scope: end */
