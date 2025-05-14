export type TypeFormMode = 'view' | 'edit';
export type TypeEditMode = 'create' | 'update';
export interface IFormMeta {
  formMode?: TypeFormMode;
  editMode?: TypeEditMode;
}
