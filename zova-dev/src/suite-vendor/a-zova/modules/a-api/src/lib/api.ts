import { createBeanDecorator } from 'zova';

export function Api(): ClassDecorator {
  return createBeanDecorator('api', 'app');
}
