import type { OperationObject } from 'openapi3-ts/oas31';
import type { IOpenapiSchemaMeta } from './schema.js';

export const SymbolOpenapiSchemaName = '__schemaName__';

export interface IOpenapiSdkItem {
  api?: string;
  schemas: string[];
  operationObject: OperationObject;
  meta?: IOpenapiSchemaMeta;
}

export type TypeRequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
