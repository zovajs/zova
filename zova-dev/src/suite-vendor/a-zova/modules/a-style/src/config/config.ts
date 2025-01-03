import { TypeBeanRecordGeneralSelectorKeys, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultStyle: 'home-base.style.default' as TypeBeanRecordGeneralSelectorKeys<'style'>,
    defaultTheme: 'home-base.theme.default' as TypeBeanRecordGeneralSelectorKeys<'theme'>,
    defaultThemeHandler: '' as TypeBeanRecordGeneralSelectorKeys<'themeHandler'>,
    model: {
      themename: {
        persister: {
          maxAge: Infinity,
        },
      },
    },
  };
};
