import type { types } from 'typestyle';
import type { TypeRenderComponentJsx } from 'zova-jsx';

import type { IResourceComponentActionRowRecord } from './actions.js';

export interface IResourceComponentTableCellRecord {}

export interface IResourceTableCellOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentTableCellOptionsCell {
  render?: keyof IResourceComponentTableCellRecord | TypeRenderComponentJsx;
  options?: IResourceTableCellOptionsBase;
}

export interface IResourceComponentTableCellActionRowRecord extends IResourceComponentTableCellRecord, IResourceComponentActionRowRecord {}
