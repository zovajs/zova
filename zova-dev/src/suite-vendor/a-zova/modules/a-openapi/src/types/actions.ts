import { TypeRenderComponentJsx } from 'zova-jsx';

import type { TypeFormScene } from './formMeta.ts';

// export interface IResourceActionBulkNameRecord {}

// export interface IResourceActionRowNameRecord {}

// export interface IResourceActionTableNameRecord extends IResourceActionBulkNameRecord, IResourceActionRowNameRecord {}

// export interface IResourceComponentActionBulkRecord {}

export interface IResourceComponentActionRowRecord {}

export interface IResourceComponentActionTableRecord extends IResourceComponentActionBulkRecord, IResourceComponentActionRowRecord {}

export interface IPermissionHint {
  action?: string;
  public?: boolean;
  formScene?: TypeFormScene | TypeFormScene[];
}

// export interface IResourceActionBulkOptionsBase {
//   class?: any;
//   style?: types.NestedCSSProperties;
//   resource?: string;
//   permission?: {
//     action?: keyof IResourceActionBulkRecord;
//     public?: boolean;
//   };
// }

// export interface IResourceComponentActionBulkOptionsAction {
//   name: keyof IResourceActionBulkRecord; // not omit operationsBulk
//   render?: keyof IResourceComponentActionBulkRecord | TypeRenderComponentJsx;
//   options?: IResourceActionBulkOptionsBase;
// }

export interface IResourceComponentActionRowOptionsAction {
  name: keyof IResourceActionRowRecord; // not omit operationsBulk
  render?: keyof IResourceComponentActionRowRecord | TypeRenderComponentJsx;
  options?: IResourceActionRowOptionsBase;
}
