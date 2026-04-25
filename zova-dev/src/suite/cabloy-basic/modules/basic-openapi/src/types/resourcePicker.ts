import type { IResourceRecord } from './resource.ts';
import type { ISelectOptions } from './select.ts';
import type { ITableQuery } from './table.ts';

export interface IResourcePickerOptions {
  resource?: keyof IResourceRecord;
  actionPath?: string;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
  relation?: string;
}
