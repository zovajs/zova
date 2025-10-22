import type { IDecoratorModelOptions } from '../types/model.js';
import { createBeanDecorator } from 'zova';

export function Model<T extends IDecoratorModelOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('model', 'ctx', true, options);
}
