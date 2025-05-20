import type { IDecoratorTableCellFormatOptions } from '../types/tableCellFormat.js';
import { createBeanDecorator } from 'zova';

export function TableCellFormat<T extends IDecoratorTableCellFormatOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('tableCellFormat', 'sys', true, options);
}
