import { IResourceActionRowOptionsBase } from 'zova-module-a-openapi';

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsSubmit extends IResourceActionRowOptionsBase {}
export interface IResourceActionRowOptionsBack extends IResourceActionRowOptionsBase {}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentActionRowRecord {
    ActionView?: IResourceActionRowOptionsView;
    // ActionUpdate?: IResourceActionRowOptionsUpdate;
    // ActionDelete?: IResourceActionRowOptionsDelete;
    // ActionOperationsRow?: IResourceActionRowOptionsOperationsRow;
    ActionSubmit?: IResourceActionRowOptionsSubmit;
    ActionBack?: IResourceActionRowOptionsBack;
  }
}
