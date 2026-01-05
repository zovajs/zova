import type { CellContext } from '@tanstack/table-core';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { VNode } from 'vue';
import type { OmitNever } from 'zova';
import type { ServiceOnion } from 'zova-module-a-bean';
import type { ControllerTable } from '../component/table/controller.jsx';

export interface ITableCellRenderContext<TData extends {} = any> {
  cellScope: ITableCellRenderScope;
  cellContext: CellContext<TData, any>;
  $$table: ControllerTable<TData>;
}

export interface ITableCellRenderScope {
  name: string;
  property: SchemaObject;
  value: any;
  displayValue?: any;
}

export type NextTableCellRender = () => VNode | string;

export interface ITableCellRecord {}

export interface ITableCellRender {
  render(
    renderContext: ITableCellRenderContext,
    options: IDecoratorTableCellOptions,
    next: NextTableCellRender
  ): VNode | string;
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
