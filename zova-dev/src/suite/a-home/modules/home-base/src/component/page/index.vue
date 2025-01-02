<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerPage, ControllerPageProps, ControllerPageEmits } from './controller.js';
import { RenderPage } from './render.jsx';
import { StylePage } from './style.js';
const props = withDefaults(defineProps<ControllerPageProps>(), ControllerPage.$propsDefault);
const emit = defineEmits<ControllerPageEmits>();
useController(props, emit, ControllerPage, RenderPage, StylePage);
</script>
