import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRestPageEntryProps } from 'zova-module-basic-restpage';

type TypeControllerRestPageEntryPublicProps<TData extends {} = {}> =
  TypeRenderComponentJsxPropsPublic & ControllerRestPageEntryProps<TData>;
export function BBPBasicRestpageEntry<TData extends {} = {}>(
  _props: TypeControllerRestPageEntryPublicProps<TData>,
) {
  return 'basic-restpage:restPageEntry';
}
