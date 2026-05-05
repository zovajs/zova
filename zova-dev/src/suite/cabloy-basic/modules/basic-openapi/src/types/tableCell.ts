import { CurrencyOptions } from '@zhennann/currency';
import { IResourceTableCellOptionsBase } from 'zova-module-a-openapi';

import { TypeDateFormatPreset } from './utils.js';

export interface IResourceTableCellOptionsDate extends IResourceTableCellOptionsBase {
  preset?: TypeDateFormatPreset;
  format?: string;
}

export interface IResourceTableCellOptionsCurrency extends IResourceTableCellOptionsBase, CurrencyOptions {}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentTableCellRecord {
    Currency?: IResourceTableCellOptionsCurrency;
    Date?: IResourceTableCellOptionsDate;
    // DateRange?: IDateRangeOptions;
    // Toggle?: IToggleOptions;
    // Select?: ISelectOptions;
    // Textarea?: ITextareaOptions;
    // ResourcePicker?: IResourcePickerOptions;
  }
}
