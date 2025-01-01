<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerCard } from './controller.js';
import { RenderCard } from './render.jsx';
const props = withDefaults(defineProps<ControllerCard['$props']>(), ControllerCard.$propsDefault);
const emit = defineEmits<ControllerCard['$emit']>();
useController(props, emit, ControllerCard, RenderCard);
</script>
