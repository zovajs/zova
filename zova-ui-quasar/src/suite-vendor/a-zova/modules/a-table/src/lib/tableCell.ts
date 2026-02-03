import type { IDecoratorTableCellOptions } from '../types/tableCell.js';
import { createBeanDecorator } from 'zova';

export function TableCell<T extends IDecoratorTableCellOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('tableCell', 'sys', true, options);
}
