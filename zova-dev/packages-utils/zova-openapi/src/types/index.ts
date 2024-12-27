import { OpenAPITSOptions } from 'openapi-typescript';

export type TypeOpenapiConfigMatchRule = string | RegExp | (string | RegExp)[];

export interface ZovaOpenapiConfigModule {
  source: string;
  options?: OpenAPITSOptions;
  match?: TypeOpenapiConfigMatchRule;
  ignore?: TypeOpenapiConfigMatchRule;
}

export interface ZovaOpenapiConfig {
  modules: Record<string, ZovaOpenapiConfigModule>;
}
