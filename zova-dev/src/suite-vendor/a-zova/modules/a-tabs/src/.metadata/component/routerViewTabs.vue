<script setup lang="ts">
import type {
  ControllerRouterViewTabsEmits,
  ControllerRouterViewTabsProps,
} from '../../component/routerViewTabs/controller.jsx';
import { useController } from 'zova';
import {
  ControllerRouterViewTabs,
} from '../../component/routerViewTabs/controller.jsx';

const props = withDefaults(
  defineProps<ControllerRouterViewTabsProps>(),
  ControllerRouterViewTabs.$propsDefault,
);
const emit = defineEmits<ControllerRouterViewTabsEmits>();
useController(props, emit, ControllerRouterViewTabs, undefined, undefined);
</script>

<template>
  <template />
</template>
