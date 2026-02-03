import 'zova-module-a-form';

declare module 'zova-module-a-form' {
  export interface IFormFieldRenderContextProps {
    label?: string | false;
    modelValue?: any;
    'onUpdate:modelValue'?: ((value: any) => void);
  }
}
