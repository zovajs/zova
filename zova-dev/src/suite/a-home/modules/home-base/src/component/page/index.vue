<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerPage, ControllerPageProps } from './controller.js';
import { RenderPage } from './render.jsx';
import { StylePage } from './style.js';
const props = withDefaults(defineProps<ControllerPageProps>(), ControllerPage.$propsDefault);
const emit = defineEmits<ControllerPage['$emit']>();
useController(props, emit, ControllerPage, RenderPage, StylePage);
</script>
