import { TableCellFormat } from '../lib/tableCellFormat.js';
import { IDecoratorTableCellFormatOptions } from '../types/tableCellFormat.js';
import { BeanTableCellFormatBase } from './bean.tableCellFormatBase.js';

export interface ITableCellFormatOptionsFallback extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsFallback>()
export class TableCellFormatFallback extends BeanTableCellFormatBase<ITableCellFormatOptionsFallback> {}
