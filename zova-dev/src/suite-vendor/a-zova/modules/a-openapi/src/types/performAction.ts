import { TableIdentity } from 'table-identity';
import { IActionRecord, IDecoratorActionOptions } from 'zova-module-a-action';

export interface IPerformActionRecord {}

export type IPerformActionProviderRecord = {
  [KEY in keyof IPerformActionRecord]: keyof IActionRecord;
};

export interface IPerformActionOptionsBase<Result = any> extends IDecoratorActionOptions<Result> {}

export interface IPerformActionRowOptionsBase<Result = any> extends IDecoratorActionOptions<Result> {
  resource?: string;
  id?: TableIdentity;
}

export interface IPerformActionBulkOptionsBase<Result = any> extends IDecoratorActionOptions<Result> {
  resource?: string;
}
