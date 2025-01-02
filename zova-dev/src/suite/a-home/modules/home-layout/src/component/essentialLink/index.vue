<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerEssentialLink, ControllerEssentialLinkProps } from './controller.js';
import { RenderEssentialLink } from './render.jsx';
const props = withDefaults(defineProps<ControllerEssentialLinkProps>(), ControllerEssentialLink.$propsDefault);
const emit = defineEmits<ControllerEssentialLink['$emit']>();
useController(props, emit, ControllerEssentialLink, RenderEssentialLink);
</script>
