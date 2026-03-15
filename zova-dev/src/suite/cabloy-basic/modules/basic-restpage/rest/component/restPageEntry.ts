import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRestPageEntryProps } from '../../src/component/restPageEntry/controller.jsx';

type TypeControllerRestPageEntryPublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerRestPageEntryProps<TData>;
export function PPBasicRestpageEntry<TData extends {} = {}>(
  _props: TypeControllerRestPageEntryPublicProps<TData>,
) {
  return 'basic-restpage:restPageEntry';
}
