<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import {
  ControllerRouterViewTabs,
  ControllerRouterViewTabsProps,
  ControllerRouterViewTabsEmits,
} from './controller.js';
import { RenderRouterViewTabs } from './render.jsx';
import { StyleRouterViewTabs } from './style.js';
const props = withDefaults(defineProps<ControllerRouterViewTabsProps>(), ControllerRouterViewTabs.$propsDefault);
const emit = defineEmits<ControllerRouterViewTabsEmits>();
useController(props, emit, ControllerRouterViewTabs, RenderRouterViewTabs, StyleRouterViewTabs);
</script>
