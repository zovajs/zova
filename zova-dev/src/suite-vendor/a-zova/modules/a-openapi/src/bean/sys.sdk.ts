import type { PathsObject, ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { shallowReactive } from 'vue';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';

@Sys()
export class SysSdk extends BeanBase {
  schemas: Record<string, SchemaObject | ReferenceObject>;
  paths: PathsObject;

  protected async __init__() {
    this.schemas = shallowReactive({});
    this.paths = shallowReactive({});
  }
}
