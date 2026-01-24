import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRestPageProps } from '../../src/component/restPage/controller.jsx';

type TypeControllerRestPagePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerRestPageProps<TData>;
export function ZZDevuiRestpageRestPage<TData extends {} = {}>(
  _props: TypeControllerRestPagePublicProps<TData>,
) {
  return 'devui-restpage:restPage';
}
