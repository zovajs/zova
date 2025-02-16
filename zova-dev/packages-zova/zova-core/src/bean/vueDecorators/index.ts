import { computed } from './computed.js';
import { controllerMounted } from './controllerMounted.js';
import { emit } from './emit.js';
import { model } from './model.js';
import { raw } from './raw.js';
import { shallow } from './shallow.js';
import { watch } from './watch.js';
import { watchEffect } from './watchEffect.js';

export const vueDecorators = {
  computed,
  emit,
  watch,
  watchEffect,
  raw,
  shallow,
  model,
  controllerMounted,
};
