import { TableIdentity } from 'table-identity';
import { types } from 'typestyle';

import { IResourceActionRowNameRecord } from './actions.js';
import { TypeFormScene } from './formMeta.js';

export interface IResourceFormActionRowOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: string;
  id?: TableIdentity;
  permission?: {
    action?: keyof IResourceActionRowNameRecord;
    public?: boolean;
    formScene?: TypeFormScene | TypeFormScene[];
  };
}
