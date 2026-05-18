import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

export type IResourceTableActionBulkNameRecord = {
  [KEY in keyof IResourceTableActionBulkRecord as KEY extends `${string}:action${infer Name}`
    ? Uncapitalize<Name>
    : KEY]: IResourceTableActionBulkRecord[KEY];
};

export interface IResourceTableActionBulkRecord {}

export interface IResourceTableActionBulkOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: string;
  permission?: {
    action?: keyof IResourceTableActionBulkNameRecord;
    public?: boolean;
  };
}

export interface IResourceRenderTableActionBulkOptionsAction {
  name?: keyof IResourceTableActionBulkNameRecord; // not omit operationsBulk
  render?: keyof IResourceTableActionBulkRecord | TypeRenderComponentJsx;
  options?: IResourceTableActionBulkOptionsBase;
}
