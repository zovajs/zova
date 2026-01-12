import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from './actions.js';

export type TypeOpenApiRestResourceScene = 'table' | 'row';

export interface IOpenApiOptionsRestResource {
  permissions?: IOpenApiOptionsRestResourcePermissions;
  provider?: IOpenApiOptionsRestResourceProvider;
  form?: IOpenApiOptionsRestResourceForm;
  table?: IOpenApiOptionsRestResourceTable;
}

export interface IOpenApiOptionsRestResourceForm {}

export interface IOpenApiOptionsRestResourceTable {}

export interface IOpenApiOptionsRestResourcePermissions {
  table?: TypeOpenApiOptionsRestResourcePermissionsTable;
  row?: TypeOpenApiOptionsRestResourcePermissionsRow;
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
  restPageEntry?: TypeComponentRecordSelectorKeysStrict<'restPageEntry'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
