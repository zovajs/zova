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
