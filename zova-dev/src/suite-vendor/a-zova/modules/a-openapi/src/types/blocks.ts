import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentBlockOptionsBlock {
  render?: keyof IResourceComponentBlockRecord | TypeRenderComponentJsx;
  options?: IResourceBlockOptionsBase;
}
