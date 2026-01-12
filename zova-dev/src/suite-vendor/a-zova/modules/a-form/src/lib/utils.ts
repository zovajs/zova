import type { IFormMeta, TypeFormScene } from '../types/formMeta.js';

export function formMetaFromFormScene(formScene?: TypeFormScene): IFormMeta {
  if (formScene === 'view') return { formScene, formMode: 'view', editMode: undefined };
  if (formScene === 'create') return { formScene, formMode: 'edit', editMode: 'create' };
  if (formScene === 'update') return { formScene, formMode: 'edit', editMode: 'update' };
  return { formScene: 'view', formMode: 'view', editMode: undefined };
}

export function formSceneFromFormMeta(formMeta: Partial<IFormMeta>): TypeFormScene | undefined {
  if (formMeta.formMode === 'view') return 'view';
  if (formMeta.formMode === 'edit' && formMeta.editMode === 'create') return 'create';
  if (formMeta.formMode === 'edit' && formMeta.editMode === 'update') return 'update';
  return undefined;
}
