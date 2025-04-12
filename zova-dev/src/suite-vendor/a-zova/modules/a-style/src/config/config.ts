import type {
  TypeBeanRecordGeneralSelectorKeys,
  TypeBeanRecordGeneralSelectorSpecificNameKeys,
  ZovaSys,
} from 'zova';

export const config = (_sys: ZovaSys) => {
  return {
    defaultCss: 'home-base.css.default' as TypeBeanRecordGeneralSelectorKeys<'css'>,
    defaultTheme: 'home-base.theme.default' as TypeBeanRecordGeneralSelectorKeys<'theme'>,
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
