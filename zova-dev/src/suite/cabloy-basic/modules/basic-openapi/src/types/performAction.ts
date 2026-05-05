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

declare module 'zova-module-a-openapi' {
  export interface IPerformActionRecord {
    ActionCreate?: IPerformActionOptionsCreate;
    ActionView?: IPerformActionOptionsView;
    ActionEdit?: IPerformActionOptionsEdit;
    ActionDelete?: IPerformActionOptionsDelete;
  }
}
