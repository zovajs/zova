import { BeanTableCellFormatBase, TableCellFormat } from 'zova-module-a-table';

export interface ITableCellFormatOptionsFallback extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsFallback>()
export class TableCellFormatFallback extends BeanTableCellFormatBase<ITableCellFormatOptionsFallback> {}
