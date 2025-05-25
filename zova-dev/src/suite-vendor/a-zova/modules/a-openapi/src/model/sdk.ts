import { z } from 'zod';
import { ILocaleInfos, Use, usePrepareArg } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { SysSdk } from '../bean/sys.sdk.js';
import { schemaToZodSchema } from '../lib/schema.js';
import { SymbolOpenapiSchemaName, TypeRequestMethod } from '../types/sdk.js';

const __schemaRefPrefix = '#/components/schemas/';

@Model()
export class ModelSdk extends BeanModelBase {
  @Use({ beanFullName: 'a-openapi.sys.sdk' })
  get $$sysSdk(): SysSdk {
    return usePrepareArg(
      this.selector,
      true,
    );
  }

  protected async __init__(locale: keyof ILocaleInfos) {
    super.__init__(locale);
    if (!locale) throw new Error('locale not specified');
  }

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
        const zodSchema = schemaToZodSchema(querySchema.data);
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
        const zodSchema = queryZodSchema.data as unknown as z.AnyZodObject;
        Object.keys(zodSchema.shape).forEach(key => {
          const fieldSchema = zodSchema.shape[key];
          if (fieldSchema.constructor.name === 'ZodDefault') {
            mask[key] = true;
          }
        });
        return zodSchema.pick(mask).parse({});
      },
      staleTime: Infinity,
      meta: {
        ssr: { dehydrate: false },
        persister: false,
      },
    });
  }
}
