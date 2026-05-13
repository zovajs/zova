import type { ZovaSys } from 'zova';

import { IFormProvider } from 'zova-module-a-openapi';

export const config = (_sys: ZovaSys) => {
  const formProvider: IFormProvider = {
    behaviors: {
      FormField: 'quasar-form:formField',
      FormFieldLayout: 'quasar-form:formFieldLayout',
    },
    components: {
      Input: 'quasar-form:formFieldInput',
    },
  };
  return {
    formProvider,
  };
};
