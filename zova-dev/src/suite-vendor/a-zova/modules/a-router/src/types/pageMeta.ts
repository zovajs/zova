import { IFormMeta } from 'zova-module-a-form';

export interface IPageMeta {
  pageTitle?: string;
  pageDirty?: boolean;
  formMeta?: IFormMeta;
}
