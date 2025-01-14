import { createBeanDecorator } from 'zova';
import { IDecoratorBehaviorOptions } from '../types/behavior.js';

export function Behavior<T extends IDecoratorBehaviorOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('behavior', 'new', true, options);
}
