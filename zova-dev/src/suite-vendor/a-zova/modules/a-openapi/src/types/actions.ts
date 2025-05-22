export interface IResourceActionTableOptions {}
export interface IResourceActionRowOptions {}

export interface TypeResourceActionTableRecord {
  create: IResourceActionTableOptions;
}

export interface TypeResourceActionRowRecord {
  view: IResourceActionRowOptions;
  update: IResourceActionRowOptions;
  delete: IResourceActionRowOptions;
}

export type TypeResourceActionRowRecordRender = {
  [key in keyof TypeResourceActionRowRecord as `action${Capitalize<key>}`]: TypeResourceActionRowRecord[key]
};
