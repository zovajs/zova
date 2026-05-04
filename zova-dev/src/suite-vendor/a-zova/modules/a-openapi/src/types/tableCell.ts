import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

export interface IResourceComponentTableCellRecord {}

export interface IResourceTableCellOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentTableCellOptionsCell {
  render?: keyof IResourceComponentTableCellRecord | TypeRenderComponentJsx;
  options?: IResourceTableCellOptionsBase;
}
