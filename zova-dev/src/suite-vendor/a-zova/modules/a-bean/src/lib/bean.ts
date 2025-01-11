import { createBeanDecorator } from 'zova';

export function Bean(): ClassDecorator {
  return createBeanDecorator('bean', 'ctx');
}

export function Virtual(): ClassDecorator {
  return createBeanDecorator('bean', undefined, undefined, undefined, undefined, true);
}

export function Service(): ClassDecorator {
  return createBeanDecorator('service', 'ctx');
}

export function Store(): ClassDecorator {
  return createBeanDecorator('store', 'app');
}

export function Tool(): ClassDecorator {
  return createBeanDecorator('tool', 'app');
}

export function Data(): ClassDecorator {
  return createBeanDecorator('data', 'new');
}

export function Controller(): ClassDecorator {
  return createBeanDecorator('controller', 'ctx');
}

export function Render(): ClassDecorator {
  return createBeanDecorator('render', 'ctx');
}

export function Style(): ClassDecorator {
  return createBeanDecorator('style', 'ctx');
}
