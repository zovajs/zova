import type { IDecoratorBehaviorOptions } from '../types/behavior.js';
import { createBeanDecorator } from 'zova';

export function Behavior<T extends IDecoratorBehaviorOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('behavior', 'new', true, options);
}
