import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableCellTestProps } from 'zova-module-demo-basic';

type TypeControllerTableCellTestPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerTableCellTestProps;
export function BBZDemoBasicTableCellTest(_props: TypeControllerTableCellTestPublicProps) {
  return 'demo-basic:tableCellTest';
}
