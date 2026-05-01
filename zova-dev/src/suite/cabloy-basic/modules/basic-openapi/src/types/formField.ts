import 'zova-module-a-openapi';
import type { CurrencyOptions } from '@zhennann/currency';

import type { ICaptchaOptions } from './captcha.ts';
import type { IDateOptions } from './date.ts';
import type { IDateRangeOptions } from './dateRange.ts';
import type { IInputOptions } from './input.ts';
import type { IResourcePickerOptions } from './resourcePicker.ts';
import type { ISelectOptions } from './select.ts';
import type { ITextareaOptions } from './textarea.ts';
import type { IToggleOptions } from './toggle.ts';

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentFormFieldRecord {
    Input?: IInputOptions;
    Captcha?: ICaptchaOptions;
    Currency?: CurrencyOptions;
    Date?: IDateOptions;
    DateRange?: IDateRangeOptions;
    Toggle?: IToggleOptions;
    Select?: ISelectOptions;
    Textarea?: ITextareaOptions;
    ResourcePicker?: IResourcePickerOptions;
  }
}
