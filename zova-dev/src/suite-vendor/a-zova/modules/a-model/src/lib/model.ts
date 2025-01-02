import { createBeanDecorator } from 'zova';

export function Model(): ClassDecorator {
  return createBeanDecorator('model', 'ctx');
}
