import type { IDecoratorActionOptions } from '../types/action.js';
import { createBeanDecorator } from 'zova';

export function Action<T extends IDecoratorActionOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('action', 'sys', true, options);
}
