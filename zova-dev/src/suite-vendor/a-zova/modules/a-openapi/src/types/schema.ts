import type { OpenAPIObject } from 'openapi3-ts/oas31';
import type { IOpenApiOptionsRestResource } from './restResource.js';

export interface IOpenapiSchema {
  doc: OpenAPIObject;
  meta?: IOpenapiSchemaMeta;
}

export interface IOpenapiSchemaMeta {
  restResource?: IOpenApiOptionsRestResource;
}
