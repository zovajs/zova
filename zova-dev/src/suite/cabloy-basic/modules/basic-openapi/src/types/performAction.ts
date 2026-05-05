import 'zova-module-a-openapi';
import { IPerformActionBulkOptionsBase, IPerformActionRowOptionsBase } from 'zova-module-a-openapi';

export interface IPerformActionOptionsCreate<Result = any> extends IPerformActionBulkOptionsBase<Result> {
  replace?: boolean;
}

export interface IPerformActionOptionsView<Result = any> extends IPerformActionRowOptionsBase<Result> {
  replace?: boolean;
}

export interface IPerformActionOptionsEdit<Result = any> extends IPerformActionRowOptionsBase<Result> {
  replace?: boolean;
}

export interface IPerformActionOptionsDelete<Result = any> extends IPerformActionRowOptionsBase<Result> {}

export interface IPerformActionOptionsLog<Result = any> extends IPerformActionBulkOptionsBase<Result> {
  name?: string;
  message: any;
}

export interface IPerformActionOptionsAlert<Result = any> extends IPerformActionBulkOptionsBase<Result> {
  message: string;
  wait?: boolean;
}

export interface IPerformActionOptionsConfirm<Result = any> extends IPerformActionBulkOptionsBase<Result> {
  message: string;
}

export interface IPerformActionOptionsCopy<Result = any> extends IPerformActionBulkOptionsBase<Result> {
  text: any;
}

export interface IPerformActionOptionsSetValue<Result = any> extends IPerformActionBulkOptionsBase<Result> {
  name?: string;
  value?: any;
  disableNotifyChanged?: boolean;
}

declare module 'zova-module-a-openapi' {
  export interface IPerformActionRecord {
    ActionCreate?: IPerformActionOptionsCreate;
    ActionView?: IPerformActionOptionsView;
    ActionEdit?: IPerformActionOptionsEdit;
    ActionDelete?: IPerformActionOptionsDelete;
    ActionLog?: IPerformActionOptionsLog;
    ActionAlert?: IPerformActionOptionsAlert;
    ActionConfirm?: IPerformActionOptionsConfirm;
    ActionCopy?: IPerformActionOptionsCopy;
    ActionSetValue?: IPerformActionOptionsSetValue;
  }
}
