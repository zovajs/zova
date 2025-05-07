import type { OpenAPIObject, OperationObject, PathsObject, ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { shallowReactive } from 'vue';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { BeanFetch } from 'zova-module-a-fetch';

const PATH_PARAM_RE = /\{([^{}/]+)\}/g;

@Sys()
export class SysSdk extends BeanBase {
  schemas: Record<string, SchemaObject | ReferenceObject>;
  paths: PathsObject;

  protected async __init__() {
    this.schemas = shallowReactive({});
    this.paths = shallowReactive({});
  }

  getSdk(api: string | undefined, apiMethod: string | undefined): OperationObject | undefined {
    if (!api) return;
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    return this.paths[api2]?.[apiMethod2];
  }

  async loadSdk($fetch: BeanFetch, api?: string, apiMethod?: string): Promise<OperationObject | undefined> {
    if (!api) return;
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    if (this.paths[api2]?.[apiMethod2]) return this.paths[api2][apiMethod2];
    const data = await $fetch[apiMethod2]<any, OpenAPIObject>(
      this.sys.util.apiActionPathTranslate(api2),
      undefined,
      this.sys.util.apiActionConfigPrepare(undefined, { openapiSchema: true }),
    );
    // schemas
    const schemas = data.components?.schemas;
    if (schemas) {
      for (const key in schemas) {
        this.schemas[key] = schemas[key];
      }
    }
    // paths
    const paths = data.paths;
    if (paths) {
      for (const key in paths) {
        const path = key.replace(PATH_PARAM_RE, ':$1');
        if (!this.paths[path]) this.paths[path] = shallowReactive({});
        for (const method in paths[key]) {
          this.paths[path][method] = paths[key][method];
        }
      }
    }
    // ok
    return this.paths[api2][apiMethod2];
  }
}
