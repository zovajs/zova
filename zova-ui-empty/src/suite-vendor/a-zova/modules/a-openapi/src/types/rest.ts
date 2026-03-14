import type { CurrencyOptions } from '@zhennann/currency';
import type { ComponentPublicInstance } from 'vue';
import type { Constructable, IComponentRecord, TypeBeanRecordGeneralSelector } from 'zova';
import type { TypeRenderComponentJsx } from 'zova-jsx';
import type { TypeResourceActionRowRecordRender } from './actions.js';
import type { ICaptchaOptions } from './captcha.js';
import type { TypeDateFormat } from './date.js';
import type { IResourcePickerOptions } from './resourcePicker.js';
import type { ISelectOptions } from './select.js';
import type { ITextareaOptions } from './textarea.js';
import type { IToggleOptions } from './toggle.js';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeFormFieldRenderComponentNormal | TypeTableCellRenderComponentNormal;
  captcha?: ICaptchaOptions;
  currency?: CurrencyOptions;
  dateFormat?: TypeDateFormat;
  toggle?: IToggleOptions;
  select?: ISelectOptions;
  textarea?: ITextareaOptions;
  resourcePicker?: IResourcePickerOptions;
  customKey?: string;
  visible?: boolean;
  displayValue?: any;
  order?: number;
  table?: Omit<ISchemaObjectExtensionFieldRest, TypeSchemaScene>;
  form?: Omit<ISchemaObjectExtensionFieldRest, TypeSchemaScene>;
  filter?: Omit<ISchemaObjectExtensionFieldRest, TypeSchemaScene>;
}

export interface ISchemaObjectExtensionFieldFilterCapabilities {
  where?: boolean;
  // filter?: boolean;
  order?: boolean;
  // group?: boolean;
}

export interface ISchemaObjectExtensionFieldFilter {
  capabilities?: ISchemaObjectExtensionFieldFilterCapabilities;
}

export interface ISchemaObjectExtensionField {
  key?: string;
  rest?: ISchemaObjectExtensionFieldRest;
  filter?: ISchemaObjectExtensionFieldFilter;
}

declare module 'openapi3-ts/oas30' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

declare module 'openapi3-ts/oas31' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

export type TypeSchemaScene = 'table' | 'form' | 'filter';
export type TypeFormSchemaScene = 'form' | 'filter';

export const renderFormFieldTopPropsSystem = ['order', 'table', 'form', 'filter'];
export const renderTableColumnTopPropsSystem = ['order', 'table', 'form', 'filter', 'displayValue'];

export type TypeRenderComponentPreset = keyof TypeResourceActionRowRecordRender | 'text' | 'captcha' | 'currency' | 'date' | 'dateRange' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'image' | 'file' | 'color' | 'password' | 'email' | 'url';

// form
export type TypeFormFieldRenderComponentNormal =
  Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | TypeRenderComponentPreset;
export type TypeFormFieldRenderComponent = TypeFormFieldRenderComponentNormal | TypeRenderComponentJsx;
export type TypeFormFieldRenderComponentProvider = Constructable | Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | 'input' | 'textarea' | 'select';

// table
export type TypeTableCellRenderComponentNormal =
  Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | (keyof TypeBeanRecordGeneralSelector<'tableCell'>) | TypeRenderComponentPreset;
export type TypeTableCellRenderComponent = TypeTableCellRenderComponentNormal | TypeRenderComponentJsx;
export type TypeTableCellRenderComponentProvider = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | (keyof TypeBeanRecordGeneralSelector<'tableCell'>) | 'text';
export type TypeTableRenderComponentProvider = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | TypeRenderComponentJsx;
