import type { OperationObject } from 'openapi3-ts/oas31';

export interface IOpenapiSdkItem {
  schemas: string[];
  operationObject: OperationObject;
}
