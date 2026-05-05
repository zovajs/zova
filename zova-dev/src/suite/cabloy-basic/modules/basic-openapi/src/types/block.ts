import type {
  IResourceBlockOptionsBase,
  IResourceComponentActionRowOptionsAction,
  IResourceComponentBlockOptionsBlock,
  TypeFormScene,
} from 'zova-module-a-openapi';

import 'zova-module-a-openapi';
import { TableIdentity } from 'table-identity';

export interface IResourceBlockOptionsPage extends IResourceBlockOptionsBase {
  blocks?: IResourceComponentBlockOptionsBlock[];
  resource?: string;
}

export interface IResourceBlockOptionsFilter extends IResourceBlockOptionsBase {}

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {
  blocks?: IResourceComponentBlockOptionsBlock[];
  resource?: string;
  id?: TableIdentity;
  formScene?: TypeFormScene;
}

export interface IResourceBlockOptionsToolbarRow extends IResourceBlockOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

export interface IResourceBlockOptionsForm extends IResourceBlockOptionsBase {}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentBlockRecord {
    BlockPage?: IResourceBlockOptionsPage;
    BlockFilter?: IResourceBlockOptionsFilter;
    BlockPageEntry?: IResourceBlockOptionsPageEntry;
    BlockToolbarRow?: IResourceBlockOptionsToolbarRow;
    BlockForm?: IResourceBlockOptionsForm;
  }
}
