<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerPage } from './controller.js';
import { RenderPage } from './render.jsx';
import { StylePage } from './style.js';
import { NSControllerPage } from '../../.metadata/index.jsx';
const props = withDefaults(defineProps<NSControllerPage.PropsInput>(), ControllerPage.$propsDefault);
const emit = defineEmits<ControllerPage['$emit']>();
useController(props, emit, ControllerPage, RenderPage, StylePage);
</script>
