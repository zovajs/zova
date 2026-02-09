import type { UnwrapNestedRefs } from 'vue';
import type { DateInstance, DefaultsInstance, DisplayInstance, LocaleInstance, ThemeInstance } from 'vuetify';

import 'zova';

export interface VuetifyGlobal {
  defaults: UnwrapNestedRefs<DefaultsInstance>;
  display: UnwrapNestedRefs<DisplayInstance>;
  theme: UnwrapNestedRefs<ThemeInstance>;
  icons: Record<string, any>;
  locale: UnwrapNestedRefs<LocaleInstance>;
  date: UnwrapNestedRefs<DateInstance>;
}

declare module 'zova' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
  }
}
