import { isNil } from '@cabloy/utils';
import { cast, ILocaleRecord, TypeEventOff, Use, usePrepareArg } from 'zova';
import { $QueryAutoLoad, BeanModelBase, IDecoratorModelOptions, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';
import { getSchemaOfRequestBody, getSchemaOfRequestQuery, getSchemaOfRequestQueryFilter, getSchemaOfResponseBody, schemaToZodSchema } from '../lib/schema.js';
import { IOpenapiSchemas, TypeOpenapiSchemasSdk } from '../types/schema.js';
import { TypeRequestMethod } from '../types/sdk.js';

const __schemaRefPrefix = '#/components/schemas/';

export interface IModelOptionsSdk extends IDecoratorModelOptions {}

@Model<IModelOptionsSdk>()
export class ModelSdk extends BeanModelBase {
  private _eventSsrHmrReload: TypeEventOff;

  @Use({ beanFullName: 'a-openapi.sys.sdk' })
  get $$sysSdk(): SysSdk {
    return usePrepareArg(
      this.selector,
      true,
    );
  }

  protected async __init__(locale: keyof ILocaleRecord) {
    if (!locale) throw new Error('locale not specified');
    // event
    if (process.env.CLIENT && this.sys.env.SSR_HMR === 'true') {
      this._eventSsrHmrReload = this.sys.meta.event.on('a-ssrhmr:reloadModelSdk', async (_data, next) => {
        await this.$refetchQueries({ queryKey: ['bootstrap'] });
        await this.$refetchQueries({ queryKey: ['sdk'] });
        return next();
      });
    }
  }

  protected __dispose__() {
    if (this._eventSsrHmrReload) {
      this._eventSsrHmrReload();
    }
  }

  getBootstrap(resource: string) {
    return this.$useStateData({
      queryKey: ['bootstrap', resource],
      queryFn: async () => {
        const api = await this.$$sysSdk.loadBootstrap(this.$fetch, resource);
        if (!api) throw new Error('load bootstrap error');
        return api ?? null;
      },
    });
  }

  getSdk(api: string, apiMethod?: TypeRequestMethod): TypeOpenapiSchemasSdk {
    if (!api) throw new Error('should specify api');
    const [api2, apiMethod2] = this.$$sysSdk.prepareApiMeta(api, apiMethod);
    return this.$useStateData({
      queryKey: ['sdk', api2, apiMethod2],
      queryFn: async () => {
        const sdk = await this.$$sysSdk.loadSdk(this.$fetch, api, apiMethod);
        if (!sdk) throw new Error('load sdk error');
        for (const schemaName of sdk.schemas) {
          if (process.env.SERVER) {
            await $QueryAutoLoad(() => this.getSchema(schemaName));
          } else {
            await this.$refetchQueries({ queryKey: ['schema', schemaName] });
          }
        }
        return sdk;
      },
    }) as TypeOpenapiSchemasSdk;
  }

  getSchema(schemaName: string) {
    if (schemaName.startsWith(__schemaRefPrefix)) {
      schemaName = schemaName.substring(__schemaRefPrefix.length);
    }
    return this.$useStateData({
      queryKey: ['schema', schemaName],
      queryFn: async () => {
        const schema = this.$$sysSdk.getSchema(schemaName);
        return schema ?? null;
      },
    });
  }

  getZodSchema(schemaName: string) {
    return this.$useStateComputed({
      queryKey: ['zodSchema', schemaName],
      queryFn: () => {
        const querySchema = this.getSchema(schemaName);
        if (!querySchema.data) return null;
        const zodSchema = schemaToZodSchema(querySchema.data);
        return zodSchema;
      },
    });
  }

  getSchemaDefaultValue(schemaName: string) {
    return this.$useStateComputed({
      queryKey: ['schemaDefaultValue', schemaName],
      queryFn: () => {
        const querySchema = this.getSchema(schemaName);
        if (!querySchema.data) return null;
        const schema = querySchema.data;
        // const schema = this.$$sysSdk.getSchema(schemaName);
        // if (!schema) return null;
        const defaultValues = {};
        for (const key in schema.properties) {
          const property = schema.properties[key] as any;
          if (!isNil(property.default)) {
            defaultValues[key] = property.default;
          }
        }
        return defaultValues;
      },
    });
  }

  public createSdkSchemas(api: string, apiMethod?: TypeRequestMethod): IOpenapiSchemas {
    const sdk = this.getSdk(api, apiMethod);
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
        return self.getSchema(schemaName).data;
      },
      get responseBody() {
        const schemaData = getSchemaOfResponseBody(operationObject);
        const schemaName = cast(schemaData?.properties?.data)?.$ref;
        if (!schemaName) return;
        return self.getSchema(schemaName).data;
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
          return self.getSchema(schemaName).data;
        }
        // pages
        const schemaBody = this.requestBody;
        return cast(schemaBody?.properties?.list)?.items;
      },
    };
  }
}
