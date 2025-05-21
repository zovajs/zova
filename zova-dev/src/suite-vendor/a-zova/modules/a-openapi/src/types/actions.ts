export interface IResourceActionTableOptions {}
export interface IResourceActionRowOptions {}

export interface TypeResourceActionTableRecord {
  create: IResourceActionTableOptions;
}

export interface TypeResourceActionRowRecord {
  update: IResourceActionRowOptions;
  delete: IResourceActionRowOptions;
}
