import type { IDecoratorMetaOptions } from '../types/meta.js';
import { createBeanDecorator } from 'zova';

export function Meta<T extends IDecoratorMetaOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('meta', 'app', undefined, options);
}
