import { createBeanDecorator } from 'zova';

export function Api(): ClassDecorator {
  return createBeanDecorator('api', 'app');
}

export function ApiMeta(): ClassDecorator {
  return createBeanDecorator('apiMeta', 'app');
}
