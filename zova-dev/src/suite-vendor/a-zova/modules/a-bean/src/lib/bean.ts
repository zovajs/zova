import { createBeanDecorator } from 'zova';

export function Bean(): ClassDecorator {
  return createBeanDecorator('bean', 'ctx');
}
