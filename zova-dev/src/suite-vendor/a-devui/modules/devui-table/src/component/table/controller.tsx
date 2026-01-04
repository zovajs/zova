import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { type ControllerTableProps as ControllerTablePropsSuper } from 'zova-module-a-table';

export interface ControllerTableProps<TData extends unknown | object | any[] = unknown | object | any[]> extends  ControllerTablePropsSuper<TData> {
}

@Controller()
export class ControllerTable<TData extends unknown | object | any[] = unknown | object | any[]> extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}

}
