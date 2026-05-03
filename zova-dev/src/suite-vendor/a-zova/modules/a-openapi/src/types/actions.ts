import { TableIdentity } from 'table-identity';
import { TypeRenderComponentJsx } from 'zova-jsx';

import type { TypeFormScene } from './formMeta.ts';

export interface IResourceComponentFormFieldRecord {}

export interface IResourceActionBulkRecord {}

export interface IResourceActionRowRecord {}

export interface IResourceActionTableRecord extends IResourceActionBulkRecord, IResourceActionRowRecord {}

export type IResourceComponentActionBulkRecord = {
  [key in keyof IResourceActionBulkRecord as `Action${Capitalize<key>}`]: IResourceActionBulkRecord[key];
};

export type IResourceComponentActionRowRecord = {
  [key in keyof IResourceActionRowRecord as `Action${Capitalize<key>}`]: IResourceActionRowRecord[key];
};

export interface IResourceComponentActionTableRecord extends IResourceComponentActionBulkRecord, IResourceComponentActionRowRecord {}

export interface IResourceActionBulkPresetOptionsBase {
  preset?: IResourceComponentActionBulkRecord;
}

export interface IPermissionHint {
  action?: string;
  public?: boolean;
  formScene?: TypeFormScene | TypeFormScene[];
}

export interface IResourceActionBulkOptionsBase {
  class?: any;
  resource?: string;
  permission?: {
    action?: keyof IResourceActionBulkRecord;
    public?: boolean;
  };
}

export interface IResourceActionRowPresetOptionsBase {
  preset?: IResourceComponentActionRowRecord;
}

export interface IResourceActionRowOptionsBase {
  class?: any;
  resource?: string;
  id?: TableIdentity;
  permission?: {
    action?: keyof IResourceActionRowRecord;
    public?: boolean;
    formScene?: TypeFormScene | TypeFormScene[];
  };
}

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsSubmit extends IResourceActionRowOptionsBase {}
export interface IResourceActionRowOptionsBack extends IResourceActionRowOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceComponentActionBulkOptionsAction[];
}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

export interface IResourceComponentActionBulkOptionsAction {
  name: keyof IResourceActionBulkRecord; // not omit operationsBulk
  render?: keyof IResourceComponentActionBulkRecord | TypeRenderComponentJsx;
  options?: IResourceComponentActionBulkOptions;
}

export interface IResourceComponentActionBulkOptions {
  preset?: IResourceComponentActionBulkRecord;
}

export interface IResourceComponentActionRowOptionsAction {
  name: keyof IResourceActionRowRecord; // not omit operationsBulk
  render?: keyof IResourceComponentActionRowRecord | TypeRenderComponentJsx;
  options?: IResourceComponentActionRowOptions;
}

export interface IResourceComponentActionRowOptions {
  preset?: IResourceComponentActionRowRecord;
}
