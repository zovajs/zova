<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerLayoutDefault } from './controller.js';
import { RenderLayoutDefault } from './render.jsx';
import { StyleLayoutDefault } from './style.js';
import { NSControllerLayoutDefault } from '../../.metadata/index.jsx';
const props = withDefaults(defineProps<NSControllerLayoutDefault.PropsInput>(), ControllerLayoutDefault.$propsDefault);
const emit = defineEmits<ControllerLayoutDefault['$emit']>();
useController(props, emit, ControllerLayoutDefault, RenderLayoutDefault, StyleLayoutDefault);
</script>
