import { TableIdentity } from 'table-identity';

export interface IResourceActionTableRecord {}

export interface IResourceActionRowRecord {}

export interface IResourceActionTableOptionsBase {
  resource?: string;
}

export interface IResourceActionRowOptionsBase {
  resource?: string;
  id?: TableIdentity;
  class?: any;
}
