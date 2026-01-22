import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from './actions.js';

export type TypeOpenApiRestResourceScene = 'table' | 'row';

export interface IOpenapiOptionsResourceMeta {
  permissions?: IOpenapiOptionsResourceMetaPermissions;
  provider?: IOpenapiOptionsResourceMetaProvider;
  form?: IOpenapiOptionsResourceMetaForm;
  table?: IOpenapiOptionsResourceMetaTable;
}

export interface IOpenapiOptionsResourceMetaForm {}

export interface IOpenapiOptionsResourceMetaTable {}

export interface IOpenapiOptionsResourceMetaPermissions {
  table?: TypeOpenApiOptionsRestResourcePermissionsTable;
  row?: TypeOpenApiOptionsRestResourcePermissionsRow;
}

export type TypeOpenApiOptionsRestResourcePermissionsTable = {
  [key in keyof TypeResourceActionTableRecord]?: boolean;
};

export type TypeOpenApiOptionsRestResourcePermissionsRow = {
  [key in keyof TypeResourceActionRowRecord]?: boolean;
};

export interface IOpenapiOptionsResourceMetaProvider {
  components?: IOpenapiOptionsResourceMetaProviderComponents;
  actions?: IActionsRecord;
}

export interface IOpenapiOptionsResourceMetaProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  restPageEntry?: TypeComponentRecordSelectorKeysStrict<'restPageEntry'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
