import { OperationObject } from 'openapi3-ts/oas31';
import { BeanBase, cast, Virtual } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { getSchemaOfRequestBody, getSchemaOfRequestQuery, getSchemaOfRequestQueryFilter, getSchemaOfResponseBody } from '../lib/schema.js';
import { TypeRequestMethod } from '../types/sdk.js';

@Bean()
@Virtual()
export class BeanApiSchemaBase extends BeanBase {
  public $createApiSchemas(api: string | undefined, apiMethod: TypeRequestMethod | undefined) {
    const querySdk = this.$sdk.getSdk(api, apiMethod);
    return this._createApiSchemasInner(querySdk?.data?.operationObject);
  }

  private _createApiSchemasInner(operationObject?: OperationObject) {
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
      get row() {
        const schemaData = getSchemaOfResponseBody(operationObject);
        if (!schemaData) return;
        const schemaName = cast(schemaData?.properties?.data)?.items?.$ref;
        if (schemaName) {
          return {
            paged: false,
            schema: self.$sdk.getSchema(schemaName).data,
          };
        }
        const schemaNamePaged = cast(schemaData?.properties?.data)?.$ref;
        if (!schemaNamePaged) return;
        const querySchemaPaged = self.$sdk.getSchema(schemaNamePaged);
        return {
          paged: true,
          schema: cast(querySchemaPaged.data?.properties?.list)?.items,
        };
      },
    };
  }
}
