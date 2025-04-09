import type { defineOptions, VNode } from 'vue';
import type { IBeanSceneRecord } from '../decorator/interface/beanOptions.js';
import type { RequiredSome } from '../types/utils/requiredSome.js';

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
  slots?: object;
}

export interface IControllerData {
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

export type IComponentOptions = Parameters<typeof defineOptions>[0];

export type ISlot = () => VNode;

export interface ISlotsDefault {
  default?: ISlot;
}

export type TypePropValueFromModel<T> = T extends 'vModel' ? 'modelValue' : T extends `vModel:${string}_${string}` ? never : T extends `vModel:${infer ARG}` ? ARG : never;
export type TypePropUpdateFromModel<T> = T extends 'vModel' ? 'onUpdate:modelValue' : T extends `vModel:${string}_${string}` ? never : T extends `vModel:${infer ARG}` ? `onUpdate:${ARG}` : never;
// @ts-ignore ignore
export type TypeControllerInnerProps<PROPS, PROPSDEFAULT> = RequiredSome<PROPS, PROPSDEFAULT>;
