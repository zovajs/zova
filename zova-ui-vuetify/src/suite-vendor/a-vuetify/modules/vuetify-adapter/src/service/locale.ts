import { inject } from 'vue';
import { LocaleSymbol } from 'vuetify/lib/composables/locale.mjs';
import { en, zhHans } from 'vuetify/locale';
import { BeanBase } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceLocale extends BeanBase {
  public async initialize() {
    if (!this.sys.config.locale.cookieLocale) return;
    this.app.ctx.util.instanceScope(() => {
      const locale = inject(LocaleSymbol);
      if (locale) {
        locale.messages.value = { 'en-us': en, 'zh-cn': zhHans };
        locale.current.value = this.app.meta.locale.current;
      }
    });
  }
}
