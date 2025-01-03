import { createBeanDecorator } from 'zova';

export function Css(): ClassDecorator {
  return createBeanDecorator('css', 'app');
}

export function Theme(): ClassDecorator {
  return createBeanDecorator('theme', 'app');
}
