import type LuxonAdapter from '@date-io/luxon';
import type { UnwrapNestedRefs } from 'vue';

import type { DateInstance, DefaultsInstance, DisplayInstance, LocaleInstance, ThemeInstance } from 'vuetify';

import 'zova';

import 'vue/jsx-runtime';

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
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicAttributes {
      type?: string;
    }
  }
}

declare module 'vuetify' {
  namespace DateModule {
    interface Adapter extends LuxonAdapter {}
  }
}
