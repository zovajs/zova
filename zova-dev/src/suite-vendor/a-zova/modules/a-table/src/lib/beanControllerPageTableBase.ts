import type { RowData, Table } from '@tanstack/table-core';
import type { TableOptionsWithReactiveData } from '@tanstack/vue-table';

import { useVueTable } from '@tanstack/vue-table';
import { markRaw } from 'vue';
import { BeanControllerPageBase } from 'zova';

export class BeanControllerPageTableBase extends BeanControllerPageBase {
  public $useTable<TData extends RowData>(
    initialOptions: TableOptionsWithReactiveData<TData>,
  ): Table<TData> {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useVueTable(initialOptions));
    });
  }
}
