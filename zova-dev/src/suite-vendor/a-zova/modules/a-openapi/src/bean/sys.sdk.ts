import type { OpenAPIObject, PathItemObject, PathsObject, ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
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

  getSdk(_api?: string): PathItemObject | undefined {
    if (!_api) return;
    const api = this.sys.util.getApiPath(_api)!;
    return this.paths[api];
  }

  async loadSdk($fetch: BeanFetch, _api?: string, _apiMethod?: string): Promise<PathItemObject | undefined> {
    if (!_api) return;
    const api = this.sys.util.getApiPath(_api)!;
    if (this.paths[api]) return this.paths[api];
    const apiMethod = _apiMethod ?? 'get';
    const data = await $fetch[apiMethod]<any, OpenAPIObject>(
      this.sys.util.apiActionPathTranslate(api),
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
        this.paths[path] = paths[key];
      }
    }
    // ok
    return this.paths[api];
  }
}
