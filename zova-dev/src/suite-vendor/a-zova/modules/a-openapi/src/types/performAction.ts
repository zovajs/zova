import { TableIdentity } from 'table-identity';
import { IDecoratorActionOptions } from 'zova-module-a-action';

export interface IPerformActionRecord {}

export interface IPerformActionOptionsBase<Result = any> extends IDecoratorActionOptions<Result> {}

export interface IPerformActionRowOptionsBase<Result = any> extends IDecoratorActionOptions<Result> {
  resource?: string;
  id?: TableIdentity;
}

export interface IPerformActionBulkOptionsBase<Result = any> extends IDecoratorActionOptions<Result> {
  resource?: string;
}
