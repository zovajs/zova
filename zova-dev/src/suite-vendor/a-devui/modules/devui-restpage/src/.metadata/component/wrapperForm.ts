import type { DefineModelOptions, TypeControllerInnerProps, TypePropUpdateFromModel, TypePropValueFromModel } from 'zova';
import type { ControllerWrapperFormModels, ControllerWrapperFormProps } from '../../component/wrapperForm/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperForm } from '../../component/wrapperForm/controller.jsx';
import { RenderWrapperForm } from '../../component/wrapperForm/render.jsx';

export type TypeControllerWrapperFormPublicProps = {
  controllerRef?: (ref: ControllerWrapperForm) => void;
} & ControllerWrapperFormProps & ControllerWrapperFormModels &
{
  [KEY in keyof ControllerWrapperFormModels as TypePropValueFromModel<KEY>]: ControllerWrapperFormModels[KEY];
} &
{
  [KEY in keyof ControllerWrapperFormModels as TypePropUpdateFromModel<KEY>]: (value: ControllerWrapperFormModels[KEY]) => void;
};
type TypeModelArguments = {
  [KEY in keyof ControllerWrapperFormModels as TypePropValueFromModel<KEY>]: ControllerWrapperFormModels[KEY];
};
type ControllerInnerProps =
      TypeControllerInnerProps<ControllerWrapperFormProps & {
        [KEY in keyof ControllerWrapperFormModels as TypePropValueFromModel<KEY>]: ControllerWrapperFormModels[KEY];
      }, keyof typeof ControllerWrapperForm.$propsDefault>;
declare module 'zova-module-devui-restpage' {
  export interface ControllerWrapperForm {
    $props: ControllerInnerProps;
    $useModel<K extends keyof TypeModelArguments>(name: K, options?: DefineModelOptions<TypeModelArguments[K]>): ControllerInnerProps[K];
  }
}
declare module 'zova-module-devui-restpage' {
  export interface RenderWrapperForm extends ControllerWrapperForm {}
}
export const ZWrapperForm = defineComponent(
  (_props: TypeControllerWrapperFormPublicProps) => {
    useController(ControllerWrapperForm, RenderWrapperForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
