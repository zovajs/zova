<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import {
  ControllerLayoutDefault,
  ControllerLayoutDefaultProps,
  ControllerLayoutDefaultEmits,
} from '../../component/layoutDefault/controller.jsx';
import { RenderLayoutDefault } from '../../component/layoutDefault/render.jsx';
import { StyleLayoutDefault } from '../../component/layoutDefault/style.js';
const props = withDefaults(defineProps<ControllerLayoutDefaultProps>(), ControllerLayoutDefault.$propsDefault);
const emit = defineEmits<ControllerLayoutDefaultEmits>();
useController(props, emit, ControllerLayoutDefault, RenderLayoutDefault, StyleLayoutDefault);
</script>
