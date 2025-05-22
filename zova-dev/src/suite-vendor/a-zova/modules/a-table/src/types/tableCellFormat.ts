import type { CellContext } from '@tanstack/table-core';
import type { VNode } from 'vue';
import type { OmitNever } from 'zova';
import type { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion, TypeComposer } from 'zova-module-a-bean';

export type TypeTableCellFormatsMatched = Record<string, TypeComposer | undefined>;

export type NextTableCellFormat = (props?: CellContext<{}, unknown>) => VNode | string;

export interface ITableCellFormatRecord {}

export interface ITableCellFormatRender {
  render(props: CellContext<{}, unknown>, options: IDecoratorTableCellFormatOptions, next: NextTableCellFormat): VNode | string;
}

export type TypeTableCellFormatType = 'vnode' | 'fallback' | 'value';
export interface IDecoratorTableCellFormatOptions
  extends IOnionOptionsEnable,
  IOnionOptionsMatch<string>,
  IOnionOptionsDeps<keyof ITableCellFormatRecord> {
  type: TypeTableCellFormatType;
}

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
