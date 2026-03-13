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
