import type { ModelResource } from 'zova-module-rest-resource';
import { createColumnHelper } from '@tanstack/table-core';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { BeanControllerTableBase, ControllerTable, ITableCelScope, ITablePaged, ITableProvider, ITableQuery, ITableResPaged, TypeTableGetColumnsNext } from 'zova-module-a-table';

// @ts-ignore ignore
// eslint-disable-next-line
export interface ControllerWrapperTableProps<TData extends {} = {}> {
  tableProvider?: ITableProvider;
  tableScope: ITableCelScope;
}

@Controller()
export class ControllerWrapperTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {

  }
}
