import type { BeanBase, BeanContainer, IMonkeyBeanInit } from 'zova';
import { inject, reactive } from 'vue';
import { DateAdapterSymbol } from 'vuetify/lib/composables/date/date.js';
import { DefaultsSymbol } from 'vuetify/lib/composables/defaults.js';
import { DisplaySymbol } from 'vuetify/lib/composables/display.js';
import { IconSymbol } from 'vuetify/lib/composables/icons.js';
import { LocaleSymbol } from 'vuetify/lib/composables/locale.js';
import { ThemeSymbol } from 'vuetify/lib/composables/theme.js';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyBeanInit {
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
