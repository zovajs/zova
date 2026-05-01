import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { IActionsRecord } from 'zova-module-a-action';

import type { IOpenapiPermissions } from './permissions.js';

export type TypeOpenApiRestResourceScene = 'table' | 'row';

export type TypeOpenapiPermissions = IOpenapiPermissions | boolean;

export interface IOpenapiOptionsResourceMeta {
  /**
   * false: disallow
   * true: public
   * undefined: by api
   * IOpenapiPermissions: specific
   */
  permissions?: TypeOpenapiPermissions;
  provider?: IOpenapiOptionsResourceMetaProvider;
  form?: IOpenapiOptionsResourceMetaForm;
  table?: IOpenapiOptionsResourceMetaTable;
}

export interface IOpenapiOptionsResourceMetaForm {}

export interface IOpenapiOptionsResourceMetaTable {}

export interface IOpenapiOptionsResourceMetaProvider {
  components?: IOpenapiOptionsResourceMetaProviderComponents;
  actions?: IActionsRecord;
}

export interface IOpenapiOptionsResourceMetaProviderComponents {
  RestPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  RestPageEntry?: TypeComponentRecordSelectorKeysStrict<'restPageEntry'>;
  Table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  Form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
