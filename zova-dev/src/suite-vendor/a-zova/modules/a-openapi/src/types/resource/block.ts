import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

export interface IResourceBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentBlockOptionsBlock {
  render?: keyof IResourceBlockRecord | TypeRenderComponentJsx;
  options?: IResourceBlockOptionsBase;
}
