import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from './actions.js';

export type TypeOpenApiRestResourceScene = 'table' | 'row';

export interface IOpenapiOptionsResourceMeta {
  permissions?: IOpenapiOptionsRestResourcePermissions;
  provider?: IOpenapiOptionsRestResourceProvider;
  form?: IOpenapiOptionsRestResourceForm;
  table?: IOpenapiOptionsRestResourceTable;
}

export interface IOpenapiOptionsRestResourceForm {}

export interface IOpenapiOptionsRestResourceTable {}

export interface IOpenapiOptionsRestResourcePermissions {
  table?: TypeOpenApiOptionsRestResourcePermissionsTable;
  row?: TypeOpenApiOptionsRestResourcePermissionsRow;
}

export type TypeOpenApiOptionsRestResourcePermissionsTable = {
  [key in keyof TypeResourceActionTableRecord]?: boolean;
};

export type TypeOpenApiOptionsRestResourcePermissionsRow = {
  [key in keyof TypeResourceActionRowRecord]?: boolean;
};

export interface IOpenapiOptionsRestResourceProvider {
  components?: IOpenapiOptionsRestResourceProviderComponents;
  actions?: IActionsRecord;
}

export interface IOpenapiOptionsRestResourceProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  restPageEntry?: TypeComponentRecordSelectorKeysStrict<'restPageEntry'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
