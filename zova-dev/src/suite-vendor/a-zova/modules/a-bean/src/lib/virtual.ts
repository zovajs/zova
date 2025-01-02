import { createBeanDecorator } from 'vona';

export function Virtual(): ClassDecorator {
  return createBeanDecorator('bean', undefined, undefined, true);
}
