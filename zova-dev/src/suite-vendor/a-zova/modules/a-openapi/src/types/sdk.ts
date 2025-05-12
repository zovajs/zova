import type { OperationObject } from 'openapi3-ts/oas31';

export interface IOpenapiSdkItem {
  schemas: string[];
  operationObject: OperationObject;
}

export type TypeRequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
