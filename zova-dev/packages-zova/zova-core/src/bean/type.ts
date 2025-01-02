import { IBeanSceneRecord } from '../decorator/interface/beanOptions.js';

/** bean merge: bean.instance */
export interface IBeanRecord {}
export type TypeBeanRecordKeys = keyof IBeanRecord;

export type TypeBeanRecordSelector<SCENE extends keyof IBeanSceneRecord> = {
  [K in keyof IBeanRecord as K extends `${string}.${SCENE}.${string}` ? K : never]: IBeanRecord[K];
};
export type TypeBeanRecordSelectorKeys<SCENE extends keyof IBeanSceneRecord> = keyof TypeBeanRecordSelector<SCENE>;

export type TypeBeanRecordSelectorSpecificName<SCENE extends keyof IBeanSceneRecord, NAME extends string> = {
  [K in keyof IBeanRecord as K extends `${string}.${SCENE}.${NAME}` ? K : never]: IBeanRecord[K];
};

export type TypeBeanRecordSelectorSpecificNameKeys<
  SCENE extends keyof IBeanSceneRecord,
  NAME extends string,
> = keyof TypeBeanRecordSelectorSpecificName<SCENE, NAME>;

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

export function getBeanName<K extends keyof IBeanRecord>(beanFullName: K): K {
  return beanFullName;
}
