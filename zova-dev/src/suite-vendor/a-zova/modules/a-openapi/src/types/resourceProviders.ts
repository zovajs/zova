import { TypeBeanRecordGeneralSelector, TypeComponentRecordSelectorKeys } from 'zova';
import { IActionRecord } from 'zova-module-a-action';
import { IFormProviderBehaviors } from 'zova-module-a-form';

import { IResourceComponentActionBulkRecord, IResourceComponentActionRowRecord } from './actions.js';
import { IResourceComponentBlockRecord } from './blocks.js';
import { IResourceComponentFormFieldRecord } from './formField.js';
import { IPerformActionRecord } from './performAction.js';
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

export type IResourceProvidersPerformActions = {
  [KEY in keyof IPerformActionRecord]?: keyof IActionRecord;
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
  blocks: IResourceProvidersBlocks;
  formFields: IResourceProvidersFormFields;
  tableCells: IResourceProvidersTableCells;
  performActions: IResourceProvidersPerformActions;
  behaviors: IResourceProvidersBehaviors;
  table: {
    actionsBulk: IResourceProvidersTableActionsBulk;
    actionsRow: IResourceProvidersTableActionsRow;
  };
  form: {
    actionsRow: IResourceProvidersFormActionsRow;
  };
}
