import { evaluateSimple } from '@cabloy/utils';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import { mutate } from 'mutate-on-copy';
import { ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import { Use } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';
import { IOpenapiSdkItem } from '../types/sdk.js';

@Model()
export class ModelSdk extends BeanModelBase {
  schemas: Record<string, SchemaObject | ReferenceObject>;
  sdks: Record<string, Record<string, IOpenapiSdkItem>>;

  @Use()
  $$sysSdk: SysSdk;

  protected async __init__() {
    this.schemas = this.$useState(
      process.env.CLIENT ? 'local' : 'mem',
      { queryKey: ['schemas'], meta: { defaultData: {} } },
    );
    this.sdks = this.$useState(
      process.env.CLIENT ? 'local' : 'mem',
      { queryKey: ['sdks'], meta: { defaultData: {} } },
    );
  }

  getSdk(api: string | undefined, apiMethod: string | undefined): IOpenapiSdkItem | undefined {
    if (!api) return;
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    return this.sdks[api2]?.[apiMethod2];
  }

  getSchema(schemaName: string): SchemaObject | ReferenceObject {
    return this.schemas[schemaName];
  }

  getZodSchema(schemaName: string): z.ZodAny {
    const schema = this.getSchema(schemaName);
    const code = jsonSchemaToZod(schema);
    return evaluateSimple(code, { z });
  }

  async loadSdk(api?: string, apiMethod?: string): Promise<IOpenapiSdkItem | undefined> {
    if (!api) return;
    const api2 = this.sys.util.getApiPath(api)!;
    const apiMethod2 = apiMethod ?? 'get';
    if (this.sdks[api2]?.[apiMethod2]) return this.sdks[api2][apiMethod2];
    const sdk = await this.$$sysSdk.loadSdk(this.$fetch, api, apiMethod);
    if (!sdk) throw new Error('load sdk error');
    // sdks
    this.sdks = mutate(this.sdks, sdks => {
      if (!sdks[api2]) sdks[api2] = {};
      sdks[api2][apiMethod2] = sdk;
    });
    // schemas
    this.schemas = mutate(this.schemas, schemas => {
      for (const schemaName of sdk.schemas) {
        schemas[schemaName] = this.$$sysSdk.getSchema(schemaName);
      }
    });
    // ok
    return this.sdks[api2][apiMethod2];
  }
}
