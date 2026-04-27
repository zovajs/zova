import { TableIdentity } from 'table-identity';

export interface IResourceActionTableRecord1 {}

export interface IResourceActionRowRecord1 {}

export interface IResourceActionTableOptionsBase {
  resource?: string;
}

export interface IResourceActionRowOptionsBase {
  resource?: string;
  id?: TableIdentity;
}
