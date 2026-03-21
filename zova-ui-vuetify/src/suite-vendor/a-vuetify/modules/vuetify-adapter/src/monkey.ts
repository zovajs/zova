import type { BeanBase, BeanContainer, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';

import { inject, reactive } from 'vue';
import { DateAdapterSymbol } from 'vuetify/lib/composables/date/date.js';
import { DefaultsSymbol } from 'vuetify/lib/composables/defaults.js';
import { DisplaySymbol } from 'vuetify/lib/composables/display.js';
import { IconSymbol } from 'vuetify/lib/composables/icons.js';
import { LocaleSymbol } from 'vuetify/lib/composables/locale.js';
import { ThemeSymbol } from 'vuetify/lib/composables/theme.js';
import { BeanSimple } from 'zova';

import { ServiceLocale } from './service/locale.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  async appInitialize() {
    // locale
    const serviceLocale = await this.bean._newBean(ServiceLocale, false);
    await serviceLocale.initialize();
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$vuetify', {
      enumerable: false,
      configurable: true,
      get() {
        return reactive({
          defaults: inject(DefaultsSymbol),
          display: inject(DisplaySymbol),
          theme: inject(ThemeSymbol),
          icons: inject(IconSymbol),
          locale: inject(LocaleSymbol),
          date: inject(DateAdapterSymbol),
        });
      },
    });
  }
}
