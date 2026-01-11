import type { OpenAPIObject, SchemaObject } from 'openapi3-ts/oas31';
import type { IOpenApiOptionsRestResource } from './restResource.js';

export interface IOpenapiSchema {
  doc: OpenAPIObject;
  meta?: IOpenapiSchemaMeta;
}

export interface IOpenapiSchemaMeta {
  restResource?: IOpenApiOptionsRestResource;
}

export interface IOpenapiSchemaBootstrap extends IOpenapiSchema {
  api?: string;
}

export interface IOpenapiSchemas {
  query?: SchemaObject;
  filter?: SchemaObject;
  requestBody?: SchemaObject;
  responseBody?: SchemaObject;
  paged?: SchemaObject;
  row?: SchemaObject;
}
