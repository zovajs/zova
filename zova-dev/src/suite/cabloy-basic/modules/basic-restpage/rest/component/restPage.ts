import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerRestPageProps } from '../../src/component/restPage/controller.jsx';

type TypeControllerRestPagePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerRestPageProps<TData>;
export function PPBasicRestpage<TData extends {} = {}>(_props: TypeControllerRestPagePublicProps<TData>) {
  return 'basic-restpage:restPage';
}
