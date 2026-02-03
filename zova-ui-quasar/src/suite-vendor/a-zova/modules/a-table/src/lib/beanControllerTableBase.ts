import type { RowData, Table } from '@tanstack/table-core';
import type { TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { useVueTable } from '@tanstack/vue-table';
import { markRaw } from 'vue';
import { BeanControllerBase } from 'zova';

export class BeanControllerTableBase extends BeanControllerBase {
  public $useTable<TData extends RowData>(initialOptions: TableOptionsWithReactiveData<TData>): Table<TData> {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useVueTable(initialOptions));
    });
  }
}
