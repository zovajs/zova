import type { ZovaSys } from 'zova';

import { QInput } from 'quasar';
import { IResourceProviders } from 'zova-module-a-openapi';

export const config = (_sys: ZovaSys) => {
  const resourceProviders: IResourceProviders = {
    behaviors: {
      FormField: 'quasar-form:formField',
      FormFieldLayout: 'quasar-form:formFieldLayout',
    },
    formFields: {
      Input: QInput,
      Captcha: 'quasar-form:formFieldCaptcha',
    },
  };
  return {
    resourceProviders,
  };
};
