import type { types } from 'typestyle';
import type { TypeRenderComponentJsx } from 'zova-jsx';

export interface IResourceTableCellRecord {}
export interface IResourceTableCellActionRowRecord {}

export interface IResourceTableCellOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentTableCellOptionsCell {
  render?: keyof IResourceTableCellRecord | TypeRenderComponentJsx;
  options?: IResourceTableCellOptionsBase;
}

export interface IResourceTableCellActionRowRecordBoth extends IResourceTableCellRecord, IResourceTableCellActionRowRecord {}
