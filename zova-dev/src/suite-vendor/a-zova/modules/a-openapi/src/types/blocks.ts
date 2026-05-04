import type { TableIdentity } from 'table-identity';

import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

import { TypeFormScene } from './formMeta.js';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {
  blocks?: IResourceComponentBlockOptionsBlock[];
  resource?: string;
  id?: TableIdentity;
  formScene?: TypeFormScene;
}

export interface IResourceComponentBlockOptionsBlock {
  render?: keyof IResourceComponentBlockRecord | TypeRenderComponentJsx;
  options?: IResourceBlockOptionsBase;
}
