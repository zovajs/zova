import { evaluateSimple } from '@cabloy/utils';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import { z } from 'zod';
import { Use } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';

const SymbolZodSchemas = Symbol('SymbolZodSchemas');

@Model()
export class ModelSdk extends BeanModelBase {
  private [SymbolZodSchemas]: Record<string, unknown> = {};

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
          if (process.env.SERVER) {
            const querySchema = this.getSchema(schemaName);
            await querySchema.suspense();
          } else {
            this.$invalidateQueries({ queryKey: ['schema', schemaName] });
          }
          this[SymbolZodSchemas] = {};
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
      staleTime: Infinity,
    });
  }

  getZodSchema(schemaName: string) {
    if (!this[SymbolZodSchemas][schemaName]) {
      const { data } = this.getSchema(schemaName);
      if (!data) return;
      const code = jsonSchemaToZod(data);
      const zodSchema = evaluateSimple(code, { z });
      this[SymbolZodSchemas][schemaName] = zodSchema;
    }
    return this[SymbolZodSchemas][schemaName];
  }
}
