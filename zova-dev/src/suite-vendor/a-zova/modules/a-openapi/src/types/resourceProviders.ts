import { TypeBeanRecordGeneralSelector, TypeComponentRecordSelectorKeys } from 'zova';
import { IFormProviderBehaviors } from 'zova-module-a-form';

import { IResourceComponentActionBulkRecord, IResourceComponentActionRowRecord } from './actions.js';
import { IResourceComponentBlockRecord } from './blocks.js';
import { IResourceComponentFormFieldRecord } from './formField.js';
import { IResourceComponentTableCellRecord } from './tableCell.js';

export type IResourceProvidersBlocks = {
  [KEY in keyof IResourceComponentBlockRecord]?: TypeComponentRecordSelectorKeys<'block'>;
};

export type IResourceProvidersFormFields = {
  [KEY in keyof IResourceComponentFormFieldRecord]?: TypeComponentRecordSelectorKeys<'formField'>;
};

export type IResourceProvidersTableCells = {
  [KEY in keyof IResourceComponentTableCellRecord]?: keyof TypeBeanRecordGeneralSelector<'tableCell'>;
};

export type IResourceProvidersTableActionsBulk = {
  [KEY in keyof IResourceComponentActionBulkRecord]?: TypeComponentRecordSelectorKeys<'action'>;
};

export type IResourceProvidersTableActionsRow = {
  [KEY in keyof IResourceComponentActionRowRecord]?: keyof TypeBeanRecordGeneralSelector<'tableCell'>;
};

export type IResourceProvidersFormActionsRow = {
  [KEY in keyof IResourceComponentActionRowRecord]?: TypeComponentRecordSelectorKeys<'action'>;
};

export type IResourceProvidersBehaviors = IFormProviderBehaviors;

export interface IResourceProviders {
  blocks?: IResourceProvidersBlocks;
  formFields?: IResourceProvidersFormFields;
  tableCells?: IResourceProvidersTableCells;
  behaviors?: IResourceProvidersBehaviors;
  table?: {
    actionsBulk?: IResourceProvidersTableActionsBulk;
    actionsRow?: IResourceProvidersTableActionsRow;
  };
  form?: {
    actionsRow?: IResourceProvidersFormActionsRow;
  };
}

export interface IFormProvider {
  components?: IResourceProvidersFormFields & IResourceProvidersFormActionsRow;
  behaviors?: IResourceProvidersBehaviors;
}

export interface ITableProvider {
  components?: IResourceProvidersTableCells & IResourceProvidersTableActionsRow;
}
