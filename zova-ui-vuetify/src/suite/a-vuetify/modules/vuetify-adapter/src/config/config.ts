import type { ZovaSys } from 'zova';

import { VTextField } from 'vuetify/components';
import { IResourceProviders } from 'zova-module-a-openapi';

export const config = (_sys: ZovaSys) => {
  const resourceProviders: IResourceProviders = {
    behaviors: {
      FormField: 'vuetify-form:formField',
      FormFieldLayout: 'vuetify-form:formFieldLayout',
    },
    formFields: {
      Input: VTextField,
      Captcha: 'vuetify-form:formFieldCaptcha',
    },
  };
  return {
    resourceProviders,
  };
};
