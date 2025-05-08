import { evaluateSimple } from '@cabloy/utils';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import { z } from 'zod';
import { Use } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';

@Model()
export class ModelSdk extends BeanModelBase {
  @Use()
  $$sysSdk: SysSdk;

  protected async __init__() {}

  getSdk(api: string | undefined, apiMethod: string | undefined) {
    if (!api) return;
    const [api2, apiMethod2] = this.$$sysSdk.prepareInfo(api, apiMethod);
    return this.$useStateData({
      queryKey: ['sdk', api2, apiMethod2],
      queryFn: async () => {
        const sdk = await this.$$sysSdk.loadSdk(this.$fetch, api, apiMethod);
        if (!sdk) throw new Error('load sdk error');
        for (const schemaName of sdk.schemas) {
          const { suspense } = this.getSchema(schemaName);
          await suspense();
        }
        return sdk;
      },
    });
  }

  getSchema(schemaName: string) {
    return this.$useStateData({
      queryKey: ['schema', schemaName],
      queryFn: async () => {
        return this.$$sysSdk.getSchema(schemaName);
      },
    });
  }

  getZodSchema(schemaName: string) {
    return this.$useStateData({
      queryKey: ['zodSchema', schemaName],
      queryFn: async () => {
        const data = this.$$sysSdk.getSchema(schemaName);
        const code = jsonSchemaToZod(data);
        return evaluateSimple(code, { z });
      },
      meta: {
        ssr: { dehydrate: false },
        persister: false,
      },
    });
  }
}
