<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerEssentialLink } from './controller.js';
import { RenderEssentialLink } from './render.jsx';
const props = withDefaults(defineProps<ControllerEssentialLink.PropsInput>(), ControllerEssentialLink.$propsDefault);
const emit = defineEmits<ControllerEssentialLink['$emit']>();
useController(props, emit, ControllerEssentialLink, RenderEssentialLink);
</script>
