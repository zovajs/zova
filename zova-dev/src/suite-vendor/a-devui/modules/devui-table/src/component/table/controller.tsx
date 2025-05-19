import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeTable } from 'zova-module-a-table';

export interface ControllerTableProps<T extends {} = {}> {
  table: TypeTable<T>;
}

@Controller()
export class ControllerTable extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {
    this.bean._setBean('$$table', this);
  }

  get table() {
    return this.$props.table;
  }
}
