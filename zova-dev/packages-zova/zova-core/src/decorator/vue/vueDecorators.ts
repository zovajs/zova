import { WatchEffectOptions, WatchOptions } from 'vue';
import { createVueDecorator } from './createVueDecorator.js';

export function Computed(): MethodDecorator {
  return createVueDecorator('computed');
}

export function Emit(eventName?: string): MethodDecorator {
  return createVueDecorator('emit', { eventName });
}

export function Watch(path?: string, watchOptions?: WatchOptions): MethodDecorator {
  return createVueDecorator('watch', { path, watchOptions });
}

export function WatchEffect(watchEffectOptions?: WatchEffectOptions): MethodDecorator {
  return createVueDecorator('watchEffect', { watchEffectOptions });
}

export function Raw(): PropertyDecorator {
  return createVueDecorator('raw');
}

export function Shallow(): PropertyDecorator {
  return createVueDecorator('shallow');
}

export function Readonly(): PropertyDecorator {
  return createVueDecorator('readonly');
}

export function ShallowReadonly(): PropertyDecorator {
  return createVueDecorator('shallowReadonly');
}

export function Model(modelName?: string): PropertyDecorator {
  return createVueDecorator('model', { modelName });
}

export function ControllerMounted(): MethodDecorator {
  return createVueDecorator('controllerMounted');
}
