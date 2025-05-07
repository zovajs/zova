import { OperationObject, PathsObject, ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { Use } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';

@Model()
export class ModelSdk extends BeanModelBase {
  schemas: Record<string, SchemaObject | ReferenceObject>;
  paths: PathsObject;

  @Use()
  $$sysSdk: SysSdk;

  protected async __init__() {
    this.schemas = this.$useState(
      process.env.CLIENT ? 'local' : 'mem',
      { queryKey: ['schemas'], meta: { defaultData: {} } },
    );
    this.paths = this.$useState(
      process.env.CLIENT ? 'local' : 'mem',
      { queryKey: ['paths'], meta: { defaultData: {} } },
    );
  }

  getSdk(api: string | undefined, apiMethod: string | undefined): OperationObject | undefined {
    if (!api) return;
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    return this.paths[api2]?.[apiMethod2];
  }

  async loadSdk(api?: string, apiMethod?: string): Promise<OperationObject | undefined> {
    if (!api) return;
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    if (this.paths[api2]?.[apiMethod2]) return this.paths[api2][apiMethod2];
    const sdk = await this.$$sysSdk.loadSdk(this.$fetch, api, apiMethod);
    const pathsNew = { ...this.paths };
    if (!pathsNew[api2])pathsNew[api2] = {};
    pathsNew[api2][apiMethod2] = sdk;
    this.paths = pathsNew;
    // ok
    return this.paths[api2][apiMethod2];
  }
}
