import { BeanTableCellFormatBase, IDecoratorTableCellFormatOptions, TableCellFormat } from 'zova-module-a-table';

export interface ITableCellFormatOptionsCurrency extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsCurrency>()
export class TableCellFormatCurrency extends BeanTableCellFormatBase<ITableCellFormatOptionsCurrency> {}
