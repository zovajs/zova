import type { IResourceBlockOptionsBase, IResourceComponentActionRowOptionsAction } from 'zova-module-a-openapi';

import 'zova-module-a-openapi';

export interface IResourceBlockOptionsToolbarRow extends IResourceBlockOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

export interface IResourceBlockOptionsForm extends IResourceBlockOptionsBase {}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentBlockRecord {
    // BlockPage?: IResourceBlockOptionsPage;
    // BlockFilter?: IResourceBlockOptionsFilter;
    // BlockToolbarBulk?: IResourceBlockOptionsToolbarBulk;
    // BlockTable?: IResourceBlockOptionsTable;
    // BlockPager?: IResourceBlockOptionsPager;
    // BlockPageEntry?: IResourceBlockOptionsPageEntry;
    BlockToolbarRow?: IResourceBlockOptionsToolbarRow;
    BlockForm?: IResourceBlockOptionsForm;
  }
}
