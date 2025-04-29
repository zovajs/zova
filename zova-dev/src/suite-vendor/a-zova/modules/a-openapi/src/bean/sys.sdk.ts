import type { OpenAPIObject, PathsObject, ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
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

  async loadSdk($fetch: BeanFetch, api?: string) {
    if (!api) return;
    const apiPath = this.sys.util.getApiPath(api)!;
    if (this.paths[apiPath]) return;
    const data = await $fetch.post<any, OpenAPIObject>(
      this.sys.util.apiActionPathTranslate(apiPath),
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
    console.log(this.schemas);
    console.log(this.paths);
  }
}
