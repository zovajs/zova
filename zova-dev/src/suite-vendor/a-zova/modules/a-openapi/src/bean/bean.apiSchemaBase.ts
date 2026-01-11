import { OperationObject } from 'openapi3-ts/oas31';
import { BeanBase, cast, Virtual } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { getSchemaOfRequestBody, getSchemaOfRequestQuery, getSchemaOfRequestQueryFilter, getSchemaOfResponseBody } from '../lib/schema.js';
import { IOpenapiSchemas } from '../types/schema.js';
import { TypeRequestMethod } from '../types/sdk.js';

@Bean()
@Virtual()
export class BeanApiSchemaBase extends BeanBase {
  public $createApiSchemas(operationObject?: OperationObject): IOpenapiSchemas;
  public $createApiSchemas(api: string | undefined, apiMethod: TypeRequestMethod | undefined): IOpenapiSchemas;
  public $createApiSchemas(api: OperationObject | string | undefined, apiMethod?: TypeRequestMethod | undefined): IOpenapiSchemas {
    let operationObject: OperationObject | undefined;
    if (!api) {
      operationObject = undefined;
    } else if (typeof api === 'string') {
      const querySdk = this.$sdk.getSdk(api, apiMethod);
      operationObject = querySdk?.data?.operationObject;
    } else {
      operationObject = api;
    }
    return this._createApiSchemasInner(operationObject);
  }

  private _createApiSchemasInner(operationObject?: OperationObject): IOpenapiSchemas {
    const self = this;
    return {
      get query() {
        return getSchemaOfRequestQuery(operationObject);
      },
      get filter() {
        return getSchemaOfRequestQueryFilter(operationObject, { where: true });
      },
      get requestBody() {
        const schemaData = getSchemaOfRequestBody(operationObject);
        const schemaName = cast(schemaData)?.$ref;
        if (!schemaName) return;
        return self.$sdk.getSchema(schemaName).data;
      },
      get responseBody() {
        const schemaData = getSchemaOfResponseBody(operationObject);
        const schemaName = cast(schemaData?.properties?.data)?.$ref;
        if (!schemaName) return;
        return self.$sdk.getSchema(schemaName).data;
      },
      get paged() {
        const schemaData = getSchemaOfResponseBody(operationObject);
        if (!schemaData) return;
        const schemaName = cast(schemaData?.properties?.data)?.items?.$ref;
        if (schemaName) return;
        // pages
        return this.responseBody;
      },
      get row() {
        const schemaData = getSchemaOfResponseBody(operationObject);
        if (!schemaData) return;
        const schemaName = cast(schemaData?.properties?.data)?.items?.$ref;
        if (schemaName) {
          return self.$sdk.getSchema(schemaName).data;
        }
        // pages
        const schemaBody = this.requestBody;
        return cast(schemaBody?.properties?.list)?.items;
      },
    };
  }
}
