import { IResourceTableActionBulkNameRecord } from './tableActionBulk.js';
import { IResourceTableActionRowNameRecord } from './tableCellActionRow.js';

export type IResourceTableActionNameRecord = IResourceTableActionRowNameRecord & IResourceTableActionBulkNameRecord;
