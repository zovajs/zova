import type { OmitNever } from 'zova';
import type { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatchStrict, ServiceOnion } from 'zova-module-a-bean';

export interface ITableCellFormatRecord {}

export interface IDecoratorTableCellFormatOptions
  extends IOnionOptionsEnable,
  IOnionOptionsMatchStrict<string>,
  IOnionOptionsDeps<keyof ITableCellFormatRecord> {}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
    tableCellFormat: ServiceOnion<IDecoratorTableCellFormatOptions, keyof ITableCellFormatRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    tableCellFormat: OmitNever<ITableCellFormatRecord>;
  }

  export interface IBeanSceneRecord {
    tableCellFormat: never;
  }
}
