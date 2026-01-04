import { TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerTableProps<TData extends any[] = any[]> {
  getTableOptions: () => TableOptionsWithReactiveData<TData>;
}

@Controller()
export class ControllerTable<TData extends any[] = any[]> extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
