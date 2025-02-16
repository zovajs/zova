import type { IBeanSceneRecord } from '../decorator/interface/beanOptions.js';

export interface IBeanRecordGeneral {}
export interface IBeanRecordLocal {}

export type IBeanRecord = IBeanRecordGeneral & IBeanRecordLocal;
export type TypeBeanRecordKeys = keyof IBeanRecord;

export type TypeBeanRecordGeneralSelector<SCENE extends keyof IBeanSceneRecord> = {
  [K in keyof IBeanRecordGeneral as K extends `${string}.${SCENE}.${string}` ? K : never]: IBeanRecordGeneral[K];
};
export type TypeBeanRecordGeneralSelectorKeys<SCENE extends keyof IBeanSceneRecord> =
  keyof TypeBeanRecordGeneralSelector<SCENE>;

export type TypeBeanRecordGeneralSelectorSpecificName<SCENE extends keyof IBeanSceneRecord, NAME extends string> = {
  [K in keyof IBeanRecordGeneral as K extends `${string}.${SCENE}.${NAME}` ? K : never]: IBeanRecordGeneral[K];
};

export type TypeBeanRecordGeneralSelectorSpecificNameKeys<
  SCENE extends keyof IBeanSceneRecord,
  NAME extends string,
> = keyof TypeBeanRecordGeneralSelectorSpecificName<SCENE, NAME>;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IBeanScopeLocale {}
export type TypeBeanScopeLocaleKeys = keyof IBeanScopeLocale;

export interface IControllerDataContext {
  attrs?: unknown;
  emit?: unknown;
  slots?: object;
}

export interface IControllerData {
  props?: unknown;
  context: IControllerDataContext;
}

export const BeanControllerIdentifier = '$$c';
export const BeanRenderIdentifier = '$$r';
export const BeanStyleIdentifier = '$$s';
export const SymbolControllerRefDisable = Symbol('SymbolControllerRefDisable');

export function getBeanName<K extends keyof IBeanRecord>(beanFullName: K): K {
  return beanFullName;
}

export interface DefineModelOptions<T = any> {
  get?: (v: T) => any;
  set?: (v: T) => any;
}
