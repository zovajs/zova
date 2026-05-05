import { IResourceActionRowOptionsBase, IResourceComponentActionRowOptionsAction } from 'zova-module-a-openapi';

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsSubmit extends IResourceActionRowOptionsBase {}
export interface IResourceActionRowOptionsBack extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

declare module 'zova-module-a-openapi' {
  export interface IResourceActionRowRecord {
    view?: IResourceActionRowOptionsView;
    update?: IResourceActionRowOptionsUpdate;
    delete?: IResourceActionRowOptionsDelete;
    operationsRow?: IResourceActionRowOptionsOperationsRow;
    submit?: IResourceActionRowOptionsSubmit;
    back?: IResourceActionRowOptionsBack;
  }

  export interface IResourceComponentActionRowRecord {
    ActionView?: IResourceActionRowOptionsView;
    ActionUpdate?: IResourceActionRowOptionsUpdate;
    ActionDelete?: IResourceActionRowOptionsDelete;
    ActionOperationsRow?: IResourceActionRowOptionsOperationsRow;
    ActionSubmit?: IResourceActionRowOptionsSubmit;
    ActionBack?: IResourceActionRowOptionsBack;
  }
}
