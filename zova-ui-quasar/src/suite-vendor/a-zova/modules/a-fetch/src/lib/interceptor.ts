import type { IDecoratorInterceptorOptions } from '../types/interceptor.js';
import { createBeanDecorator } from 'zova';

export function Interceptor<T extends IDecoratorInterceptorOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('interceptor', 'new', true, options);
}
