import type { SchemaObject } from 'openapi3-ts/oas31';
import { shallowReactive } from 'vue';
import { BeanBase, ILocaleInfos } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { BeanFetch } from 'zova-module-a-fetch';
import { IOpenapiSchema } from '../types/schema.js';
import { IOpenapiSdkItem, SymbolOpenapiSchemaName, TypeRequestMethod } from '../types/sdk.js';

const PATH_PARAM_RE = /\{([^{}/]+)\}/g;

@Sys()
export class SysSdk extends BeanBase {
  private locale: keyof ILocaleInfos;
  schemas: Record<string, SchemaObject>;
  sdks: Record<string, Record<string, IOpenapiSdkItem>>;

  protected async __init__(locale: keyof ILocaleInfos) {
    this.locale = locale;
    this.schemas = shallowReactive({});
    this.sdks = shallowReactive({});
  }

  getSdk(api: string | undefined, apiMethod: string | undefined): IOpenapiSdkItem | undefined {
    if (!api) return;
    const [api2, apiMethod2] = this.prepareInfo(api, apiMethod);
    return this.sdks[api2]?.[apiMethod2];
  }

  getSchema(schemaName: string): SchemaObject {
    return this.schemas[schemaName];
  }

  async loadSdk($fetch: BeanFetch, api?: string, apiMethod?: TypeRequestMethod): Promise<IOpenapiSdkItem | undefined> {
    if (!api) return;
    const [api2, apiMethod2] = this.prepareInfo(api, apiMethod);
    if (this.sdks[api2]?.[apiMethod2]) return this.sdks[api2][apiMethod2];
    // params
    const params: any[] = [this.sys.util.apiActionPathTranslate(api2)];
    // body
    if (!['get', 'delete'].includes(apiMethod2)) {
      params.push(undefined);
    }
    // options
    const options = { openapiSchema: true, headers: {} };
    const localeKey = this.sys.env.APP_LOCALE_HEADER_KEY;
    if (localeKey) {
      options.headers[localeKey] = this.locale;
    }
    params.push(this.sys.util.apiActionConfigPrepare(undefined, options));
    const data: IOpenapiSchema = await $fetch[apiMethod2](...params);
    // schemas
    const schemaNames: string[] = [];
    const schemas = data.doc.components?.schemas;
    if (schemas) {
      for (const key in schemas) {
        const schema = schemas[key] as unknown as SchemaObject;
        if (!schema[SymbolOpenapiSchemaName]) {
          schema[SymbolOpenapiSchemaName] = key;
        }
        this.schemas[key] = schema;
        schemaNames.push(key);
      }
    }
    // paths
    const paths = data.doc.paths;
    if (paths) {
      for (const key in paths) {
        const path = key.replace(PATH_PARAM_RE, ':$1');
        if (!this.sdks[path]) this.sdks[path] = shallowReactive({});
        for (const method in paths[key]) {
          this.sdks[path][method] = {
            schemas: schemaNames,
            operationObject: paths[key][method],
            meta: data.meta,
          };
        }
      }
    }
    // ok
    return this.sdks[api2][apiMethod2];
  }

  prepareInfo(api?: string, apiMethod?: string) {
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    return [api2, apiMethod2];
  }
}
