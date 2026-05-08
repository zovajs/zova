import { createVueDecorator } from './createVueDecorator.ts';

export function ModelValue(modelName?: string): PropertyDecorator {
  return createVueDecorator('model', { modelName });
}
