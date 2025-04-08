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
  nameEmits: string;
  hasEmits: boolean;
  nameSlots: string;
  hasSlots: boolean;
  hasModel: boolean;
  hasModelValue: boolean;
  hasGeneric: boolean;
  generic?: string | null;
  genericKeys?: string[] | null;
  nameSchemaParams: string;
  hasSchemaParams: boolean;
  nameSchemaQuery: string;
  hasSchemaQuery: boolean;
  fileRender: string;
  importRender: string;
  fileStyle: string;
  importStyle: string;
}
