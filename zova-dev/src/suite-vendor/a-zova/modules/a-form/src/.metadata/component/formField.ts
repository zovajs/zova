import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormField } from '../../component/formField/controller.jsx';
import { RenderFormField } from '../../component/formField/render.jsx';

export interface TypeControllerFormFieldPublicProps {
  controllerRef?: (ref: ControllerFormField) => void;
}

declare module 'zova-module-a-form' {
  export interface RenderFormField extends ControllerFormField {}
}
export const ZFormField = defineComponent(
  (_props: TypeControllerFormFieldPublicProps) => {
    useController(ControllerFormField, RenderFormField, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
