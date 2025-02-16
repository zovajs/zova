import type {
  TypeBeanRecordGeneralSelectorKeys,
  TypeBeanRecordGeneralSelectorSpecificNameKeys,
  ZovaApplication,
} from 'zova';

export const config = (_app: ZovaApplication) => {
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
