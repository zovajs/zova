import type { IDecoratorTableFeatureOptions } from '../types/tableFeature.js';
import { createBeanDecorator } from 'zova';

export function TableFeature<T extends IDecoratorTableFeatureOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('tableFeature', 'sys', true, options);
}
