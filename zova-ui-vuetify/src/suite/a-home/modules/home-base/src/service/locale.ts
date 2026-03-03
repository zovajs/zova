import { inject } from 'vue';
import { LocaleSymbol } from 'vuetify/lib/composables/locale.mjs';
import { en, zhHans } from 'vuetify/locale';
import { BeanBase, ILocaleRecord } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceLocale extends BeanBase {
  protected async __init__() {}

  public initVuetifyLocale() {
    this.app.ctx.util.instanceScope(() => {
      const localeVuetify = inject(LocaleSymbol);
      if (localeVuetify) {
        localeVuetify.messages.value = { 'en-us': en, 'zh-cn': zhHans };
        localeVuetify.current.value = this.app.meta.locale.current;
      }
    });
  }

  public setLocale(locale: keyof ILocaleRecord) {
    this.app.meta.locale.current = locale;
    this.app.ctx.util.instanceScope(() => {
      const localeVuetify = inject(LocaleSymbol);
      if (localeVuetify) {
        localeVuetify.current.value = locale;
      }
    });
  }
}
