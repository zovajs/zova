import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomeapi extends BeanScopeBase {}

export interface ScopeModuleAHomeapi
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-homeapi': ScopeModuleAHomeapi;
  }

  export interface IBeanScopeConfig {
    'a-homeapi': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homeapi': (typeof locales)[TypeLocaleBase];
  }
}
