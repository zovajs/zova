import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableCellTestProps } from '../../src/component/tableCellTest/controller.jsx';

type TypeControllerTableCellTestPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerTableCellTestProps;
export function ZZDemoBasicTableCellTest(
  _props: TypeControllerTableCellTestPublicProps,
) {
  return 'demo-basic:tableCellTest';
}
