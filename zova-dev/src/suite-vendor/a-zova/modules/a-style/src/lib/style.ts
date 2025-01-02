import { createBeanDecorator } from 'zova';

export function Style(): ClassDecorator {
  return createBeanDecorator('style', 'app');
}

export function Theme(): ClassDecorator {
  return createBeanDecorator('theme', 'app');
}

export function ThemeHandler(): ClassDecorator {
  return createBeanDecorator('themeHandler', 'app');
}
