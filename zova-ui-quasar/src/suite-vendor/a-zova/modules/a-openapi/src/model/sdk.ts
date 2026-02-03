import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { cast, deepExtend, ILocaleRecord, TypeEventOff, Use, usePrepareArg } from 'zova';
import { $QueryAutoLoad, BeanModelBase, IDecoratorModelOptions, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';
import { getSchemaOfRequestBody, getSchemaOfRequestQuery, getSchemaOfRequestQueryFilter, getSchemaOfResponseBody, schemaToZodSchema } from '../lib/schema.js';
import { OrderUnknownBase } from '../types/database.js';
import { TypeOpenapiPermissions } from '../types/resourceMeta.js';
import { TypeSchemaScene } from '../types/rest.js';
import { IOpenapiSchemas, TypeOpenapiSchemasSdk } from '../types/schema.js';
import { TypeRequestMethod } from '../types/sdk.js';

const __schemaRefPrefix = '#/components/schemas/';

export interface IModelOptionsSdk extends IDecoratorModelOptions {}

@Model<IModelOptionsSdk>({
  enableSelector: true,
})
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
    await super.__init__(locale);
    // event
    if (process.env.CLIENT && this.sys.env.SSR_HMR === 'true') {
      this._eventSsrHmrReload = this.sys.meta.event.on('a-ssrhmr:reload', async (_data, next) => {
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
        const bootstrap = await this.$$sysSdk.loadBootstrap(this.$fetch, resource);
        if (!bootstrap) throw new Error('load bootstrap error');
        if (process.env.SERVER) {
          await $QueryAutoLoad(() => this.getPermissions(resource));
        } else {
          await this.$refetchQueries({ queryKey: ['permissions', resource] });
        }
        return bootstrap ?? null;
      },
    });
  }

  getPermissions(resource: string) {
    return this.$useStateData({
      queryKey: ['permissions', resource],
      queryFn: async () => {
        // should not use this.getBootstrap(resource);
        const bootstrap = await this.$$sysSdk.loadBootstrap(this.$fetch, resource);
        let permissions = bootstrap.resourceMeta.permissions;
        if (!isNil(permissions)) return permissions;
        permissions = await this.$fetch.get(
          this.sys.util.apiActionPathTranslate(this.scope.config.api.permissions, { resource }),
          this.sys.util.apiActionConfigPrepare(),
        ) as TypeOpenapiPermissions;
        return permissions ?? null;
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

  public createApiSchemas(api: string, apiMethod?: TypeRequestMethod): IOpenapiSchemas {
    const self = this;
    const sdk = this.getSdk(api, apiMethod);
    return {
      get sdk() {
        return sdk;
      },
      get query() {
        const operationObject = sdk.data?.operationObject;
        return getSchemaOfRequestQuery(operationObject);
      },
      get filter() {
        const operationObject = sdk.data?.operationObject;
        return getSchemaOfRequestQueryFilter(operationObject, { where: true });
      },
      get requestBody() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfRequestBody(operationObject);
        const schemaName = cast(schemaBody)?.$ref;
        if (!schemaName) return;
        return self.getSchema(schemaName).data;
      },
      get responseBody() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfResponseBody(operationObject);
        const schemaName = cast(schemaBody?.properties?.data)?.$ref;
        if (!schemaName) return;
        return self.getSchema(schemaName).data;
      },
      get paged() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfResponseBody(operationObject);
        if (!schemaBody) return;
        const schemaName = cast(schemaBody?.properties?.data)?.items?.$ref;
        if (schemaName) return;
        // pages
        return this.responseBody;
      },
      get row() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfResponseBody(operationObject);
        if (!schemaBody) return;
        // schemaData
        let schemaData;
        if (schemaBody?.properties?.data.$ref) {
          schemaData = self.getSchema(schemaBody?.properties?.data.$ref).data;
        } else {
          schemaData = schemaBody?.properties?.data;
        }
        // entry
        const schemaName = cast(schemaData)?.items?.$ref;
        if (schemaName) {
          return self.getSchema(schemaName).data;
        }
        // pages
        return cast(schemaData?.properties?.list)?.items;
      },
    };
  }

  public loadSchemaProperties(schema: SchemaObject | undefined, scene: TypeSchemaScene): SchemaObject[] | undefined {
    if (!schema) return;
    const properties = schema.properties!;
    const result: SchemaObject[] = [];
    // filter
    for (const key in properties) {
      let property = properties[key] as SchemaObject;
      if (property.$ref) {
        property = this.getSchema(property.$ref).data!;
      }
      property = deepExtend({ key }, property, { rest: property.rest?.[scene] ?? {} });
      result.push(property);
    }
    // sort
    result.sort((a, b) => {
      return (a.rest?.order ?? OrderUnknownBase) - (b.rest?.order ?? OrderUnknownBase);
    });
    // ok
    return result;
  }
}
