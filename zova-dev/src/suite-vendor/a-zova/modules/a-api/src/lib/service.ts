import { createBeanDecorator } from 'zova';

export function Service(): ClassDecorator {
  return createBeanDecorator('service', 'app');
}
