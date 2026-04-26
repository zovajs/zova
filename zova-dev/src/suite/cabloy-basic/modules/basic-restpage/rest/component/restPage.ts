import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRestPageProps } from 'zova-module-basic-restpage';

type TypeControllerRestPagePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic &
  ControllerRestPageProps<TData>;
export function BBPBasicRestpage<TData extends {} = {}>(
  _props: TypeControllerRestPagePublicProps<TData>,
) {
  return 'basic-restpage:restPage';
}
