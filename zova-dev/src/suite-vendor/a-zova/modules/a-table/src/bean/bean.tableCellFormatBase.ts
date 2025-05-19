import { CellContext } from '@tanstack/table-core';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { IDecoratorTableCellFormatOptions, NextTableCellFormat } from '../types/tableCellFormat.js';

@Virtual()
export class BeanTableCellFormatBase<
  T extends IDecoratorTableCellFormatOptions = IDecoratorTableCellFormatOptions,
> extends BeanBase {
  protected $options: T;

  protected async __init__(options: T) {
    this.$options = options;
  }

  protected render(_props: CellContext<{}, unknown>, next: NextTableCellFormat): VNode | string {
    return next();
  }
}
