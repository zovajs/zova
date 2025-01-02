import { createBeanDecorator } from 'zova';

export function Bean(): ClassDecorator {
  return createBeanDecorator('bean', 'ctx');
}

export function Virtual(): ClassDecorator {
  return createBeanDecorator('bean', undefined, undefined, undefined, undefined, true);
}

export function Local(): ClassDecorator {
  return createBeanDecorator('local', 'ctx');
}

export function Store(): ClassDecorator {
  return createBeanDecorator('store', 'app');
}

export function Tool(): ClassDecorator {
  return createBeanDecorator('tool', 'app');
}
