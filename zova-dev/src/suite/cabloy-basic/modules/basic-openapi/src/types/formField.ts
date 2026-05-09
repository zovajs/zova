import 'zova-module-a-openapi';
import { IResourceFormFieldOptionsBase, ITableQuery } from 'zova-module-a-openapi';

import { ICaptchaSceneRecord, ISelectOptions } from './utils.js';

export interface IResourceFormFieldOptionsCaptcha extends IResourceFormFieldOptionsBase {
  scene?: keyof ICaptchaSceneRecord;
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
    // Input?: IResourceFormFieldOptionsInput;
    Captcha?: IResourceFormFieldOptionsCaptcha;
    // Currency?: IResourceFormFieldOptionsCurrency;
    // Date?: IResourceFormFieldOptionsDate;
    // DateRange?: IResourceFormFieldOptionsDateRange;
    Toggle?: IResourceFormFieldOptionsToggle;
    Select?: IResourceFormFieldOptionsSelect;
    Textarea?: IResourceFormFieldOptionsTextarea;
    ResourcePicker?: IResourceFormFieldOptionsResourcePicker;
  }
}
