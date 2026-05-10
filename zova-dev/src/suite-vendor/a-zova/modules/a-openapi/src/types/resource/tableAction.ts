import { IResourceTableActionBulkNameRecord } from './tableActionBulk.js';
import { IResourceTableCellActionRowNameRecord } from './tableCellActionRow.js';

export type IResourceTableActionNameRecord = IResourceTableCellActionRowNameRecord & IResourceTableActionBulkNameRecord;
