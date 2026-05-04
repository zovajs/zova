export type TypeDateFormatPreset =
  | 'DATE_SHORT'
  | 'DATE_MED'
  | 'DATE_MED_WITH_WEEKDAY'
  | 'DATE_FULL'
  | 'DATE_HUGE'
  | 'TIME_SIMPLE'
  | 'TIME_WITH_SECONDS'
  | 'TIME_WITH_SHORT_OFFSET'
  | 'TIME_WITH_LONG_OFFSET'
  | 'TIME_24_SIMPLE'
  | 'TIME_24_WITH_SECONDS'
  | 'TIME_24_WITH_SHORT_OFFSET'
  | 'TIME_24_WITH_LONG_OFFSET'
  | 'DATETIME_SHORT'
  | 'DATETIME_MED'
  | 'DATETIME_MED_WITH_WEEKDAY'
  | 'DATETIME_FULL'
  | 'DATETIME_HUGE'
  | 'DATETIME_SHORT_WITH_SECONDS'
  | 'DATETIME_MED_WITH_SECONDS'
  | 'DATETIME_FULL_WITH_SECONDS'
  | 'DATETIME_HUGE_WITH_SECONDS';

export interface ICaptchaSceneRecord {
  'captcha-simple:simple': never;
}

export interface ICaptchaOptions {
  scene?: keyof ICaptchaSceneRecord;
}

export interface ICaptchaProviderRecord {}

export interface ISelectChipsOptions {
  column?: boolean;
  filter?: boolean;
  selectedClass?: string;
}

export interface ISelectOptions {
  mode?: 'default' | 'chips';
  chipsOptions?: ISelectChipsOptions;
  multiple?: boolean;
  chips?: boolean;
  items?: any[];
  itemTitle?: string;
  itemValue?: string;
  itemProps?: string;
}
