import type { TypeComponentRecordSelectorKeysStrict } from 'zova';

export interface IOpenApiOptionsRestResource {
  permissions?: IOpenApiOptionsRestResourcePermissions;
  provider?: IOpenApiOptionsRestResourceProvider;
}

export interface IOpenApiOptionsRestResourcePermissions {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface IOpenApiOptionsRestResourceProvider {
  components?: IOpenApiOptionsRestResourceProviderComponents;
}

export interface IOpenApiOptionsRestResourceProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
