<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerLayoutEmpty } from './controller.js';
import { RenderLayoutEmpty } from './render.jsx';
import { NSControllerLayoutEmpty } from '../../.metadata/index.jsx';
const props = withDefaults(defineProps<NSControllerLayoutEmpty.PropsInput>(), ControllerLayoutEmpty.$propsDefault);
const emit = defineEmits<ControllerLayoutEmpty['$emit']>();
useController(props, emit, ControllerLayoutEmpty, RenderLayoutEmpty);
</script>
