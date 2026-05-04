import type { IResourceBlockOptionsBase, IResourceComponentBlockOptionsBlock, TypeFormScene } from 'zova-module-a-openapi';

import 'zova-module-a-openapi';
import { TableIdentity } from 'table-identity';

export interface IResourceBlockOptionsPage extends IResourceBlockOptionsBase {
  blocks?: IResourceComponentBlockOptionsBlock[];
  resource?: string;
}

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {
  blocks?: IResourceComponentBlockOptionsBlock[];
  resource?: string;
  id?: TableIdentity;
  formScene?: TypeFormScene;
}

export interface IResourceBlockOptionsToolbarRow extends IResourceBlockOptionsBase {}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentBlockRecord {
    BlockPage?: IResourceBlockOptionsPage;
    BlockPageEntry?: IResourceBlockOptionsPageEntry;
    BlockToolbarRow?: IResourceBlockOptionsToolbarRow;
  }
}
