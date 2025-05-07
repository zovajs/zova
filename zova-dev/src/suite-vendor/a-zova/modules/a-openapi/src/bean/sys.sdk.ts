import type { OpenAPIObject, ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { shallowReactive } from 'vue';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { BeanFetch } from 'zova-module-a-fetch';
import { IOpenapiSdkItem } from '../types/sdk.js';

const PATH_PARAM_RE = /\{([^{}/]+)\}/g;

@Sys()
export class SysSdk extends BeanBase {
  schemas: Record<string, SchemaObject | ReferenceObject>;
  sdks: Record<string, Record<string, IOpenapiSdkItem>>;

  protected async __init__() {
    this.schemas = shallowReactive({});
    this.sdks = shallowReactive({});
  }

  getSdk(api: string | undefined, apiMethod: string | undefined): IOpenapiSdkItem | undefined {
    if (!api) return;
    const [api2, apiMethod2] = this.prepareInfo(api, apiMethod);
    return this.sdks[api2]?.[apiMethod2];
  }

  getSchema(schemaName: string): SchemaObject | ReferenceObject {
    return this.schemas[schemaName];
  }

  async loadSdk($fetch: BeanFetch, api?: string, apiMethod?: string): Promise<IOpenapiSdkItem | undefined> {
    if (!api) return;
    const [api2, apiMethod2] = this.prepareInfo(api, apiMethod);
    if (this.sdks[api2]?.[apiMethod2]) return this.sdks[api2][apiMethod2];
    const data = await $fetch[apiMethod2]<any, OpenAPIObject>(
      this.sys.util.apiActionPathTranslate(api2),
      undefined,
      this.sys.util.apiActionConfigPrepare(undefined, { openapiSchema: true }),
    );
    // schemas
    const schemaNames: string[] = [];
    const schemas = data.components?.schemas;
    if (schemas) {
      for (const key in schemas) {
        this.schemas[key] = schemas[key];
        schemaNames.push(key);
      }
    }
    // paths
    const paths = data.paths;
    if (paths) {
      for (const key in paths) {
        const path = key.replace(PATH_PARAM_RE, ':$1');
        if (!this.sdks[path]) this.sdks[path] = shallowReactive({});
        for (const method in paths[key]) {
          this.sdks[path][method] = {
            schemas: schemaNames,
            operationObject: paths[key][method],
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
