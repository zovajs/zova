<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerRouterViewTabs } from './controller.js';
import { RenderRouterViewTabs } from './render.jsx';
import { StyleRouterViewTabs } from './style.js';
const props = withDefaults(defineProps<ControllerRouterViewTabs['$props']>(), ControllerRouterViewTabs.$propsDefault);
const emit = defineEmits<ControllerRouterViewTabs['$emit']>();
useController(props, emit, ControllerRouterViewTabs, RenderRouterViewTabs, StyleRouterViewTabs);
</script>
