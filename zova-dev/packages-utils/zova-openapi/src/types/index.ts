import type { OpenAPITSOptions } from 'openapi-typescript';

export type TypeOpenapiConfigMatchRule = string | RegExp | (string | RegExp)[];

export interface ZovaOpenapiConfigModuleBase {
  source?: string;
  options?: OpenAPITSOptions;
}

export interface ZovaOpenapiConfigModule extends ZovaOpenapiConfigModuleBase {
  operations?: {
    match?: TypeOpenapiConfigMatchRule;
    ignore?: TypeOpenapiConfigMatchRule;
  };
}

export interface ZovaOpenapiConfig {
  default?: ZovaOpenapiConfigModuleBase;
  modules: Record<string, ZovaOpenapiConfigModule>;
}
