import {
  schemaRenderActionBulk,
  schemaRenderActionBulkJsx,
  schemaRenderActionRow,
  schemaRenderActionRowJsx,
  schemaRenderBlock,
  schemaRenderBlockJsx,
  schemaRenderCell,
  schemaRenderCellJsx,
  schemaRenderField,
  schemaRenderFieldJsx,
} from './component.ts';
import {
  schemaRenderDisableNotifyChanged,
  schemaRenderFieldSource,
  schemaRenderLayout,
  schemaRenderOrder,
  schemaRenderReadonly,
  schemaRenderVisible,
} from './rest.ts';

export const render = {
  // render
  layout: schemaRenderLayout,
  visible: schemaRenderVisible,
  readonly: schemaRenderReadonly,
  order: schemaRenderOrder,
  disableNotifyChanged: schemaRenderDisableNotifyChanged,
  fieldSource: schemaRenderFieldSource,
  // component
  field: schemaRenderField,
  fieldJsx: schemaRenderFieldJsx,
  cell: schemaRenderCell,
  cellJsx: schemaRenderCellJsx,
  actionRow: schemaRenderActionRow,
  actionRowJsx: schemaRenderActionRowJsx,
  actionBulk: schemaRenderActionBulk,
  actionBulkJsx: schemaRenderActionBulkJsx,
  block: schemaRenderBlock,
  blockJsx: schemaRenderBlockJsx,
};
