import type { ComponentPublicInstance } from 'vue';
import type { Constructable, IComponentRecord, TypeBeanRecordGeneralSelector } from 'zova';
import type { TypeRenderComponentJsx } from 'zova-jsx';

import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';
import { IResourceActionRowRecord } from './actions.js';

export interface ISchemaRenderComponentPresetRecord extends IResourceActionRowRecord {}

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeFormFieldRenderComponentNormal | TypeTableCellRenderComponentNormal;
  preset?: ISchemaRenderComponentPresetRecord;
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

export type TypeRenderComponentPreset =
  | keyof ISchemaRenderComponentPresetRecord
  | 'text'
  | 'captcha'
  | 'currency'
  | 'date'
  | 'dateRange'
  | 'toggle'
  | 'select'
  | 'textarea'
  | 'resourcePicker';
// | 'checkbox';
// | 'radio'
// | 'switch';
// | 'image'
// | 'file'
// | 'color'
// | 'password'
// | 'email'
// | 'url';

// form
export type TypeFormFieldRenderComponentNormal = Constructable<ComponentPublicInstance> | keyof IComponentRecord | TypeRenderComponentPreset;
export type TypeFormFieldRenderComponent = TypeFormFieldRenderComponentNormal | TypeRenderComponentJsx;
export type TypeFormFieldRenderComponentProvider =
  | Constructable
  | Constructable<ComponentPublicInstance>
  | keyof IComponentRecord
  | 'input'
  | 'textarea'
  | 'select';

// table
export type TypeTableCellRenderComponentNormal =
  | Constructable<ComponentPublicInstance>
  | keyof IComponentRecord
  | keyof TypeBeanRecordGeneralSelector<'tableCell'>
  | TypeRenderComponentPreset;
export type TypeTableCellRenderComponent = TypeTableCellRenderComponentNormal | TypeRenderComponentJsx;
export type TypeTableCellRenderComponentProvider =
  | Constructable<ComponentPublicInstance>
  | keyof IComponentRecord
  | keyof TypeBeanRecordGeneralSelector<'tableCell'>
  | 'text';
export type TypeTableRenderComponentProvider = Constructable<ComponentPublicInstance> | keyof IComponentRecord | TypeRenderComponentJsx;
