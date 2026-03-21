import type { ZodLocaleErrors } from '../../utils/zod-enhance.js';

import { BeanSimple } from '../../bean/beanSimple.js';
import { zodSetLocaleErrors } from '../../utils/zod-enhance.js';

export class AppUtil extends BeanSimple {
  setLocaleErrors(localeErrors: ZodLocaleErrors, localeDefault?: string) {
    return zodSetLocaleErrors(this.app, localeErrors, localeDefault);
  }
}
