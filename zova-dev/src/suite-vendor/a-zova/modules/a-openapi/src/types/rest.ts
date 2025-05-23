import type { CurrencyOptions } from '@zhennann/currency';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { ComponentPublicInstance } from 'vue';
import type { Constructable, IComponentRecord } from 'zova';
import type { TypeResourceActionRowRecordRender } from './actions.js';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeRenderComponent;
  currency?: CurrencyOptions | boolean;
  visible?: boolean;
  order?: number;
  table?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
  form?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
}

export interface ISchemaObjectExtensionField {
  rest?: ISchemaObjectExtensionFieldRest;
}

declare module 'openapi3-ts/oas30' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

declare module 'openapi3-ts/oas31' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

export type TypeRenderComponent =
  Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | keyof TypeResourceActionRowRecordRender | 'text' | 'textarea' | 'currency' | 'date' | 'datetime' | 'time' | 'select' | 'checkbox' | 'radio' | 'switch' | 'image' | 'file' | 'color' | 'password' | 'email' | 'url' | 'input';

export type TypeSchemaProperties = Array<[string, SchemaObject]>;
