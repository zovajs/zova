import { emit } from './emit.ts';
import { model } from './model.ts';
import { raw } from './raw.ts';
import { shallow } from './shallow.ts';
import { watch } from './watch.ts';
import { watchEffect } from './watchEffect.ts';

export const vueDecorators = {
  emit,
  watch,
  watchEffect,
  raw,
  shallow,
  model,
};
