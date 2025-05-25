import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from './actions.js';

export interface IOpenApiOptionsRestResource {
  permissions?: IOpenApiOptionsRestResourcePermissions;
  provider?: IOpenApiOptionsRestResourceProvider;
  form?: IOpenApiOptionsRestResourceForm;
}

export interface IOpenApiOptionsRestResourceForm {}

export interface IOpenApiOptionsRestResourcePermissions {
  table: TypeOpenApiOptionsRestResourcePermissionsTable;
  row: TypeOpenApiOptionsRestResourcePermissionsRow;
}

export type TypeOpenApiOptionsRestResourcePermissionsTable = {
  [key in keyof TypeResourceActionTableRecord]?: boolean;
};

export type TypeOpenApiOptionsRestResourcePermissionsRow = {
  [key in keyof TypeResourceActionRowRecord]?: boolean;
};

export interface IOpenApiOptionsRestResourceProvider {
  components?: IOpenApiOptionsRestResourceProviderComponents;
}

export interface IOpenApiOptionsRestResourceProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
