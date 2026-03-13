import type { ISelectOptions } from './select.js';
import type { ITableQuery } from './table.js';

export interface IResourcePickerOptions {
  resource: string;
  actionPath?: string;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
  relation?: string;
}
