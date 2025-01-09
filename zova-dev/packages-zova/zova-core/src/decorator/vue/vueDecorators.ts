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

export function Raw(): MethodDecorator {
  return createVueDecorator('raw');
}
