import type { DefaultError, UseQueryReturnType } from '@tanstack/vue-query';
import type { OpenAPIObject, SchemaObject } from 'openapi3-ts/oas31';
import type { UnwrapNestedRefs } from 'vue';
import type { IOpenApiOptionsRestResource } from './restResource.js';
import type { IOpenapiSdkItem } from './sdk.js';

export interface IOpenapiSchema {
  doc: OpenAPIObject;
  meta?: IOpenapiSchemaMeta;
}

export interface IOpenapiSchemaMeta {
  restResource?: IOpenApiOptionsRestResource;
}

export type TypeOpenapiSchemasSdk = UnwrapNestedRefs<UseQueryReturnType<IOpenapiSdkItem, DefaultError>>;

export interface IOpenapiSchemas {
  sdk?: TypeOpenapiSchemasSdk;
  query?: SchemaObject;
  filter?: SchemaObject;
  requestBody?: SchemaObject;
  responseBody?: SchemaObject;
  paged?: SchemaObject;
  row?: SchemaObject;
}
