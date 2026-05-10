import { TableIdentity } from 'table-identity';
import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

import { TypeFormScene } from '../formMeta.js';
import { IResourceFormActionRowNameRecord } from './formActionRow.js';

export type IResourceTableActionRowNameRecord = {
  [KEY in keyof IResourceTableActionRowRecord as KEY extends `${string}:action${infer Name}`
    ? Uncapitalize<Name>
    : KEY]: IResourceTableActionRowRecord[KEY];
};

export interface IResourceTableActionRowRecord {}

export interface IResourceTableActionRowOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: string;
  id?: TableIdentity;
  permission?: {
    action?: IResourceFormActionRowNameRecord & IResourceTableActionRowNameRecord;
    public?: boolean;
    formScene?: TypeFormScene | TypeFormScene[];
  };
}

export interface IResourceRenderTableActionRowOptionsAction {
  name?: keyof IResourceTableActionRowNameRecord; // not omit operationsRow
  render?: keyof IResourceTableActionRowRecord | TypeRenderComponentJsx;
  options?: IResourceTableActionRowOptionsBase;
}
