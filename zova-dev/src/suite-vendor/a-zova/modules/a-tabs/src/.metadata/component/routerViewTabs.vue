<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import {
  ControllerRouterViewTabs,
  ControllerRouterViewTabsProps,
  ControllerRouterViewTabsEmits,
} from '../../component/routerViewTabs/controller.js';
import { RenderRouterViewTabs } from '../../component/routerViewTabs/render.jsx';
import { StyleRouterViewTabs } from '../../component/routerViewTabs/style.js';
const props = withDefaults(defineProps<ControllerRouterViewTabsProps>(), ControllerRouterViewTabs.$propsDefault);
const emit = defineEmits<ControllerRouterViewTabsEmits>();
useController(props, emit, ControllerRouterViewTabs, RenderRouterViewTabs, StyleRouterViewTabs);
</script>
