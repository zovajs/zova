import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerWrapperFilterProps } from 'zova-module-basic-restpage';

type TypeControllerWrapperFilterPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerWrapperFilterProps;
export function BBZBasicRestpageWrapperFilter(_props: TypeControllerWrapperFilterPublicProps) {
  return 'basic-restpage:wrapperFilter';
}
