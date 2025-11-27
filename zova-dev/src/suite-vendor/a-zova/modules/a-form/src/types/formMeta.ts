export type TypeFormMode = 'view' | 'edit';
export type TypeEditMode = 'create' | 'update';
export type TypeFormFieldLayoutKey = 'formFieldLayout' | 'formFieldLayoutFilter';

export interface IFormMeta {
  formMode?: TypeFormMode;
  editMode?: TypeEditMode;
  formFieldLayoutKey?: TypeFormFieldLayoutKey;
}
