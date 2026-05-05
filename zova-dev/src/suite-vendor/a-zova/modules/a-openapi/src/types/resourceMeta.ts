import type { TypeComponentRecordSelectorKeys } from 'zova';

import type { IOpenapiPermissions } from './permissions.js';

import { IPerformActionProviderRecord } from './performAction.js';

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
  actions?: IPerformActionProviderRecord;
}

export interface IOpenapiOptionsResourceMetaProviderComponents {
  BlockPage?: TypeComponentRecordSelectorKeys<'block'>;
  BlockFilter?: TypeComponentRecordSelectorKeys<'block'>;
  BlockToolbarBulk?: TypeComponentRecordSelectorKeys<'block'>;
  BlockPageEntry?: TypeComponentRecordSelectorKeys<'block'>;
  BlockToolbarRow?: TypeComponentRecordSelectorKeys<'block'>;
  BlockForm?: TypeComponentRecordSelectorKeys<'block'>;
}
