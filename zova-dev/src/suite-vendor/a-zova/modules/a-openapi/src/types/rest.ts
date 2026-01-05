import type { CurrencyOptions } from '@zhennann/currency';
import type { ComponentPublicInstance } from 'vue';
import type { Constructable, IComponentRecord } from 'zova';
import type { TypeRenderComponentJsx } from 'zova-jsx';
import type { TypeResourceActionRowRecordRender } from './actions.js';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeFormFieldRenderComponentNormal | TypeTableCellRenderComponentNormal;
  currency?: CurrencyOptions | boolean;
  visible?: boolean;
  order?: number;
  table?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
  form?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
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

export type TypeSchemaScene = 'table' | 'form';

export const renderFormFieldTopPropsSystem = ['order', 'table', 'form'];
export const renderTableColumnTopPropsSystem = ['order', 'table', 'form', 'displayValue'];

export type TypeRenderComponentPreset = keyof TypeResourceActionRowRecordRender | 'text' | 'currency' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'image' | 'file' | 'color' | 'password' | 'email' | 'url';

// form
export type TypeFormFieldRenderComponentNormal =
  Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | TypeRenderComponentPreset;
export type TypeFormFieldRenderComponent = TypeFormFieldRenderComponentNormal | TypeRenderComponentJsx;
export type TypeFormFieldRenderComponentProvider = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | 'input' | 'textarea' | 'select';

// table
export type TypeTableCellRenderComponentNormal =
  Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | TypeRenderComponentPreset;
export type TypeTableCellRenderComponent = TypeTableCellRenderComponentNormal | TypeRenderComponentJsx;
export type TypeTableCellRenderComponentProvider = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | 'text';
