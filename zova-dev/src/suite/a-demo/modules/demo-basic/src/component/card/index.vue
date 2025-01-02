<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerCard } from './controller.js';
import { RenderCard } from './render.jsx';
import { NSControllerCard } from '../../.metadata/index.js';
const props = withDefaults(defineProps<NSControllerCard.PropsInput>(), ControllerCard.$propsDefault);
const emit = defineEmits<ControllerCard['$emit']>();
useController(props, emit, ControllerCard, RenderCard);
</script>
