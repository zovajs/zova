export interface IControllerInfo {
  type: string;
  name: string;
  nameCapitalize: string;
  controllerExtJs: string;
  controllerExtTs: string;
  componentOptions: string;
  hasComponentOptions: boolean;
  nameProps: string;
  hasProps: boolean;
  nameModels: string;
  hasModels: boolean;
  hasModelValue: boolean;
  hasGeneric: boolean;
  generic?: string | null;
  genericKeys?: string[] | null;
  nameSchemaParams: string;
  hasSchemaParams: boolean;
  nameSchemaQuery: string;
  hasSchemaQuery: boolean;
  fileRenderFirst: string;
  hasRenderFirst: boolean;
  classNameRenderFirst: string;
  importRenderFirst: string;
  fileStyleFirst: string;
  hasStyleFirst: boolean;
  classNameStyleFirst: string;
  importStyleFirst: string;
}
