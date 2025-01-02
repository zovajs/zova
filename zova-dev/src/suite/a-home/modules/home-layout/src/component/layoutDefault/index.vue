<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerLayoutDefault, ControllerLayoutDefaultProps } from './controller.js';
import { RenderLayoutDefault } from './render.jsx';
import { StyleLayoutDefault } from './style.js';
const props = withDefaults(defineProps<ControllerLayoutDefaultProps>(), ControllerLayoutDefault.$propsDefault);
const emit = defineEmits<ControllerLayoutDefault['$emit']>();
useController(props, emit, ControllerLayoutDefault, RenderLayoutDefault, StyleLayoutDefault);
</script>
