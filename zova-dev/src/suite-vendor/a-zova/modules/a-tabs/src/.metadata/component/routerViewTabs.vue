<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import {
  ControllerRouterViewTabs,
  ControllerRouterViewTabsProps,
  ControllerRouterViewTabsEmits,
} from '../../component/routerViewTabs/controller.jsx';
const props = withDefaults(defineProps<ControllerRouterViewTabsProps>(), ControllerRouterViewTabs.$propsDefault);
const emit = defineEmits<ControllerRouterViewTabsEmits>();
useController(props, emit, ControllerRouterViewTabs, undefined, undefined);
</script>
