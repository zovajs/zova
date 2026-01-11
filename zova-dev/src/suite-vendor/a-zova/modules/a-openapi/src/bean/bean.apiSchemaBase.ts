import { BeanBase, cast, Virtual } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { getSchemaOfRequestBody, getSchemaOfRequestQuery, getSchemaOfRequestQueryFilter, getSchemaOfResponseBody } from '../lib/schema.js';
import { IOpenapiSchemas, TypeOpenapiSchemasSdk } from '../types/schema.js';
import { TypeRequestMethod } from '../types/sdk.js';

@Bean()
@Virtual()
export class BeanApiSchemaBase extends BeanBase {
  public $createApiSchemas(api: string, apiMethod?: TypeRequestMethod): IOpenapiSchemas {
    const sdk = this.$sdk.getSdk(api, apiMethod);
    return this._createApiSchemasInner(sdk);
  }

  private _createApiSchemasInner(sdk: TypeOpenapiSchemasSdk): IOpenapiSchemas {
    const self = this;
    const operationObject = sdk.data?.operationObject;
    return {
      get sdk() {
        return sdk;
      },
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
