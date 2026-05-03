import type { TableIdentity } from 'table-identity';

import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';

import { TypeFormScene } from './formMeta.js';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  blocks?: IResourceComponentBlockOptionsBlock[];
}

export interface IResourceBlockPresetOptionsBase {
  preset?: IResourceComponentBlockRecord;
}

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {
  resource?: string;
  id?: TableIdentity;
  formScene?: TypeFormScene;
}

export interface IResourceComponentBlockOptionsBlock {
  render?: keyof IResourceComponentBlockRecord | TypeRenderComponentJsx;
  options?: IResourceComponentBlockOptions;
}

export interface IResourceComponentBlockOptions {
  preset?: IResourceComponentBlockRecord;
}
