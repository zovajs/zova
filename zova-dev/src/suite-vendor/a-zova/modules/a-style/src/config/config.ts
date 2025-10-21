import type {
  TypeBeanRecordGeneralSelectorSpecificNameKeys,
  ZovaSys,
} from 'zova';
import type { ICssRecord } from '../types/css.js';
import type { IThemeRecord } from '../types/theme.js';

export const config = (_sys: ZovaSys) => {
  return {
    defaultCss: 'home-base:default' as keyof ICssRecord,
    defaultTheme: 'home-base:default' as keyof IThemeRecord,
    defaultThemeHandler: '' as TypeBeanRecordGeneralSelectorSpecificNameKeys<'meta', 'themeHandler'>,
    model: {
      themename: {
        persister: {
          maxAge: Infinity,
        },
      },
    },
  };
};
