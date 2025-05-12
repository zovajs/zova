import type { OperationObject } from 'openapi3-ts/oas31';

export interface IOpenapiSchemaMeta {}

export interface IOpenapiSdkItem {
  schemas: string[];
  operationObject: OperationObject;
  meta?: IOpenapiSchemaMeta;
}

export type TypeRequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
