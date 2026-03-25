import { computed } from './computed.ts';
import { controllerCreated } from './controllerCreated.ts';
import { controllerMounted } from './controllerMounted.ts';
import { emit } from './emit.ts';
import { model } from './model.ts';
import { raw } from './raw.ts';
import { shallow } from './shallow.ts';
import { watch } from './watch.ts';
import { watchEffect } from './watchEffect.ts';

export const vueDecorators = {
  computed,
  emit,
  watch,
  watchEffect,
  raw,
  shallow,
  model,
  controllerCreated,
  controllerMounted,
};
