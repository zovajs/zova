import type { PowerPartial } from 'zova';

import { createBeanDecorator } from 'zova';

import type { IDecoratorActionOptions } from '../types/action.js';

export function Action<T extends IDecoratorActionOptions>(options?: PowerPartial<T>): ClassDecorator {
  return createBeanDecorator('action', 'sys', true, options);
}
