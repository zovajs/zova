import { evaluateSimple } from '@cabloy/utils';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import { z } from 'zod';
import { Use } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';
import { SymbolOpenapiSchemaName, TypeRequestMethod } from '../types/sdk.js';

const __schemaRefPrefix = '#/components/schemas/';

@Model()
export class ModelSdk extends BeanModelBase {
  @Use()
  $$sysSdk: SysSdk;

  protected async __init__() {}

  getSdk(api: string | undefined, apiMethod: TypeRequestMethod | undefined) {
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
            const queryZodSchema = this.getZodSchema(schemaName);
            await queryZodSchema.suspense();
          } else {
            this.$invalidateQueries({ queryKey: ['schema', schemaName] });
            this.$invalidateQueries({ queryKey: ['zodSchema', schemaName] });
          }
        }
        return sdk;
      },
    });
  }

  getSchema(schemaName: string) {
    if (schemaName.startsWith(__schemaRefPrefix)) {
      schemaName = schemaName.substring(__schemaRefPrefix.length);
    }
    return this.$useStateData({
      queryKey: ['schema', schemaName],
      queryFn: async () => {
        const schema = this.$$sysSdk.getSchema(schemaName);
        if (schema && !schema[SymbolOpenapiSchemaName]) {
          schema[SymbolOpenapiSchemaName] = schemaName;
        }
        return schema;
      },
      staleTime: Infinity,
    });
  }

  getZodSchema(schemaName: string) {
    return this.$useStateData({
      queryKey: ['zodSchema', schemaName],
      queryFn: async () => {
        const querySchema = this.getSchema(schemaName);
        if (!querySchema.data) return null;
        const code = jsonSchemaToZod(querySchema.data);
        const zodSchema = evaluateSimple(code, { z });
        this.$invalidateQueries({ queryKey: ['schemaDefaultValue', schemaName] });
        return zodSchema;
      },
      staleTime: Infinity,
      meta: {
        ssr: { dehydrate: false },
        persister: false,
      },
    });
  }

  getDataDefaultValue(schemaName: string) {
    return this.$useStateData({
      queryKey: ['schemaDefaultValue', schemaName],
      queryFn: async () => {
        const queryZodSchema = this.getZodSchema(schemaName);
        if (!queryZodSchema.data) return null;
        const mask = {};
        Object.keys(queryZodSchema.data.shape).forEach(key => {
          const fieldSchema = queryZodSchema.data.shape[key];
          if (fieldSchema.constructor.name === 'ZodDefault') {
            mask[key] = true;
          }
        });
        return queryZodSchema.data.pick(mask).parse({});
      },
      staleTime: Infinity,
      meta: {
        ssr: { dehydrate: false },
        persister: false,
      },
    });
  }
}
