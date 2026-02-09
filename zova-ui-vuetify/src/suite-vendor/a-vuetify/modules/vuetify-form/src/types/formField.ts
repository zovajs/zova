import type { IIconRecord } from 'zova-module-a-icon';
import 'zova-module-a-form';

declare module 'zova-module-a-form' {
  export interface IFormFieldRenderContextProps {
    'label'?: string | false;
    'modelValue'?: any;
    'onUpdate:modelValue'?: ((value: any) => void);
    'error'?: boolean;
    'errorMessage'?: string;
    'prependIcon'?: keyof IIconRecord;
    'appendIcon'?: keyof IIconRecord;
    'nativeOnBlur'?: (e: FocusEvent) => void;
    'v-slots'?: any;
  }
}
