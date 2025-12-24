import type { CurrencyOptions } from '@zhennann/currency';
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

export type TypeRenderComponentNormal =
  Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | keyof TypeResourceActionRowRecordRender | 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'image' | 'file' | 'color' | 'password' | 'email' | 'url';

export interface TypeRenderComponentJsxProps {
  children: TypeRenderComponentJsx | TypeRenderComponentJsx[];
  vIf?: string | boolean;
  vFor?: string | any[];
  vEach?: string;
  key?: string;
  [key: string]: any | undefined;
}
export interface TypeRenderComponentJsx {
  type: (keyof IComponentRecord) | string;
  key?: string | null;
  props?: TypeRenderComponentJsxProps;
};

export type TypeRenderComponent = TypeRenderComponentNormal | TypeRenderComponentJsx;

export type TypeRenderComponentProvider = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | 'input' | 'textarea' | 'select';

export type TypeSchemaScene = 'table' | 'form';

export const renderJsxPropsSystem = ['children', 'vIf', 'vFor', 'vEach', 'vKey'];
