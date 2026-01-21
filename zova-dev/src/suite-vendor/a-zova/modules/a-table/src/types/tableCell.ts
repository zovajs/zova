import type { CellContext } from '@tanstack/table-core';
import type { OmitNever } from 'zova';
import type { ServiceOnion } from 'zova-module-a-bean';
import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { ControllerTable } from '../component/table/controller.jsx';
import type { ITableCellCelScope } from './tableColumn.js';

export interface IJsxRenderContextTableCell<TData extends {} = any> extends IJsxRenderContextBase {
  cellScope: ITableCellCelScope;
  cellContext: CellContext<TData, any>;
  $$table: ControllerTable<TData>;
}

export type NextTableCellRender = () => any;

export interface ITableCellRecord {}

export interface ITableCellRender {
  render(options: IDecoratorTableCellOptions, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender): any;
}

export interface IDecoratorTableCellOptions {}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
    tableCell: ServiceOnion<IDecoratorTableCellOptions, keyof ITableCellRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    tableCell: OmitNever<ITableCellRecord>;
  }

  export interface IBeanSceneRecord {
    tableCell: never;
  }
}
