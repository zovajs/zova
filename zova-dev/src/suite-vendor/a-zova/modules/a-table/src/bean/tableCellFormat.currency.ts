import { TableCellFormat } from '../lib/tableCellFormat.js';
import { IDecoratorTableCellFormatOptions } from '../types/tableCellFormat.js';
import { BeanTableCellFormatBase } from './bean.tableCellFormatBase.js';

export interface ITableCellFormatOptionsCurrency extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsCurrency>({ dependencies: 'a-table:fallback', match: '!!rest.currency' })
export class TableCellFormatCurrency extends BeanTableCellFormatBase<ITableCellFormatOptionsCurrency> {}
