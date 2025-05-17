import type { ComponentPublicInstance } from 'vue';
import type { Constructable, IComponentRecord } from 'zova';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionRest {
  render?: TypeRenderComponent;
}

export interface ISchemaObjectExtension {
  rest?: ISchemaObjectExtensionRest;
}

declare module 'openapi3-ts/oas30' {
  export interface SchemaObject extends ISchemaObjectExtension {}
}

declare module 'openapi3-ts/oas31' {
  export interface SchemaObject extends ISchemaObjectExtension {}
}

export type TypeRenderComponent = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | string;
