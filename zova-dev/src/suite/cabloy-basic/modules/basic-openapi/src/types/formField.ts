import 'zova-module-a-openapi';
import type { CurrencyOptions } from '@zhennann/currency';

import { IResourceFormFieldOptionsBase, ITableQuery } from 'zova-module-a-openapi';

import { ICaptchaSceneRecord, ISelectOptions, TypeDateFormatPreset } from './utils.js';

export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';

export interface IResourceFormFieldOptionsInput extends IResourceFormFieldOptionsBase {
  value?: any;
  type?: HTMLInputElementType;
  placeholder?: string;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IResourceFormFieldOptionsCaptcha extends IResourceFormFieldOptionsBase {
  scene?: keyof ICaptchaSceneRecord;
}

export interface IResourceFormFieldOptionsCurrency extends IResourceFormFieldOptionsBase, CurrencyOptions {}

export interface IResourceFormFieldOptionsDate extends IResourceFormFieldOptionsBase {
  preset?: TypeDateFormatPreset;
  format?: string;
}

export interface IResourceFormFieldOptionsDateRange extends IResourceFormFieldOptionsBase {
  separator?: string;
}

export interface IResourceFormFieldOptionsToggle extends IResourceFormFieldOptionsBase {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

export interface IResourceFormFieldOptionsSelect extends IResourceFormFieldOptionsBase, ISelectOptions {}

export interface IResourceFormFieldOptionsTextarea extends IResourceFormFieldOptionsBase {
  autoGrow?: boolean;
  maxRows?: number;
  maxHeight?: number;
  noResize?: boolean;
  rows?: number;
  color?: string;
  bgColor?: string;
  counter?: string | number | true;
}

export interface IResourceFormFieldOptionsResourcePicker extends IResourceFormFieldOptionsBase {
  resource?: string;
  actionPath?: string;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
  relation?: string;
}

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentFormFieldRecord {
    Input?: IResourceFormFieldOptionsInput;
    Captcha?: IResourceFormFieldOptionsCaptcha;
    Currency?: IResourceFormFieldOptionsCurrency;
    Date?: IResourceFormFieldOptionsDate;
    DateRange?: IResourceFormFieldOptionsDateRange;
    Toggle?: IResourceFormFieldOptionsToggle;
    Select?: IResourceFormFieldOptionsSelect;
    Textarea?: IResourceFormFieldOptionsTextarea;
    ResourcePicker?: IResourceFormFieldOptionsResourcePicker;
  }
}
