import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { IDecoratorTableCellFormatOptions } from '../types/tableCellFormat.js';

@Virtual()
export class BeanTableCellFormatBase<
  T extends IDecoratorTableCellFormatOptions = IDecoratorTableCellFormatOptions,
> extends BeanBase {
  protected $options: T;

  protected async __init__(options: T) {
    this.$options = options;
  }
}
