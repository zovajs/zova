import type { TableIdentity } from 'table-identity';

import { TypeRenderComponent } from 'zova-jsx';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  resource?: string;
  id?: TableIdentity;
  blocks?: IResourceComponentBlockOptionsBlock[];
}

export interface IResourceBlockPresetOptionsBase {
  preset?: IResourceComponentBlockRecord;
}

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {}

export interface IResourceComponentBlockOptionsBlock extends IResourceComponentBlockOptions {}

// export interface IResourceComponentBlockOptionsBlock {
//   name: keyof IResourceComponentBlockRecord;
//   options: IResourceComponentBlockOptions;
// }

export interface IResourceComponentBlockOptions {
  render?: TypeRenderComponent;
  preset?: IResourceComponentBlockRecord;
}
