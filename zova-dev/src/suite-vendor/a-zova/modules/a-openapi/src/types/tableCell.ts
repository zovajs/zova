import type { types } from 'typestyle';
import type { TypeRenderComponentJsx } from 'zova-jsx';

import { TableIdentity } from 'table-identity';

import { TypeFormScene } from './formMeta.js';

export type IResourceTableCellActionRowNameRecord = {
  [KEY in keyof IResourceTableCellActionRowRecord as KEY extends `${string}:action${infer Name}`
    ? Uncapitalize<Name>
    : KEY]: IResourceTableCellActionRowRecord[KEY];
};

export interface IResourceTableCellRecord {}
export interface IResourceTableCellActionRowRecord {}

export interface IResourceTableCellOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceTableCellActionRowOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: string;
  id?: TableIdentity;
  permission?: {
    action?: keyof IResourceTableCellActionRowNameRecord;
    public?: boolean;
    formScene?: TypeFormScene | TypeFormScene[];
  };
}

export interface IResourceComponentTableCellOptionsCell {
  render?: keyof IResourceTableCellRecord | TypeRenderComponentJsx;
  options?: IResourceTableCellOptionsBase;
}

export interface IResourceTableCellActionRowOptionsAction {
  name: keyof IResourceTableCellActionRowNameRecord; // not omit operationsRow
  render?: keyof IResourceTableCellActionRowRecord | TypeRenderComponentJsx;
  options?: IResourceActionRowOptionsBase;
}
