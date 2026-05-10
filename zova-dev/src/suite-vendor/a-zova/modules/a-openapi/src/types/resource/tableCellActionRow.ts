import { TableIdentity } from 'table-identity';
import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

import { TypeFormScene } from '../formMeta.js';

export type IResourceTableCellActionRowNameRecord = {
  [KEY in keyof IResourceTableCellActionRowRecord as KEY extends `${string}:action${infer Name}`
    ? Uncapitalize<Name>
    : KEY]: IResourceTableCellActionRowRecord[KEY];
};

export interface IResourceTableCellActionRowRecord {}

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

export interface IResourceRenderTableCellActionRowOptionsAction {
  name: keyof IResourceTableCellActionRowNameRecord; // not omit operationsRow
  render?: keyof IResourceTableCellActionRowRecord | TypeRenderComponentJsx;
  options?: IResourceTableCellActionRowOptionsBase;
}
