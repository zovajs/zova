import { IResourceTableActionBulkNameRecord } from './tableActionBulk.js';
import { IResourceTableActionRowNameRecord } from './tableActionRow.js';

export type IResourceTableActionNameRecord = IResourceTableActionRowNameRecord & IResourceTableActionBulkNameRecord;
