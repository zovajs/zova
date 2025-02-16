<script setup lang="ts">
import type {
  ControllerPageEmits,
  ControllerPageProps,
} from '../../component/page/controller.jsx';
import { useController } from 'zova';
import {
  ControllerPage,
} from '../../component/page/controller.jsx';

const props = withDefaults(
  defineProps<ControllerPageProps>(),
  ControllerPage.$propsDefault,
);
const emit = defineEmits<ControllerPageEmits>();
useController(props, emit, ControllerPage, undefined, undefined);
</script>

<template>
  <template />
</template>
