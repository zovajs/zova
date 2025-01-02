import { createBeanDecorator } from 'zova';

export function Virtual(): ClassDecorator {
  return createBeanDecorator('bean', undefined, undefined, undefined, undefined, true);
}
