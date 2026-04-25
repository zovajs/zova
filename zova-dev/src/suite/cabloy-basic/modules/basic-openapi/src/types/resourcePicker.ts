import { ITableQuery } from 'zova-module-a-openapi';

import type { ISelectOptions } from './select.ts';

export interface IResourcePickerOptions {
  resource?: string;
  actionPath?: string;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
  relation?: string;
}
