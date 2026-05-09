import { IResourceTableCellOptionsBase } from 'zova-module-a-openapi';

export interface IResourceTableCellOptionsDate extends IResourceTableCellOptionsBase {
  preset?: TypeDateFormatPreset;
  format?: string;
}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentTableCellRecord {
    // Currency?: IResourceTableCellOptionsCurrency;
    Date?: IResourceTableCellOptionsDate;
    // DateRange?: IDateRangeOptions;
    // Toggle?: IToggleOptions;
    // Select?: ISelectOptions;
    // Textarea?: ITextareaOptions;
    // ResourcePicker?: IResourcePickerOptions;
  }
}
