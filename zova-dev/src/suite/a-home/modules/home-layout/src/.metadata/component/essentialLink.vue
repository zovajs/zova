<script setup lang="ts">
import type {
  ControllerEssentialLinkEmits,
  ControllerEssentialLinkProps,
} from '../../component/essentialLink/controller.jsx';
import { useController } from 'zova';
import {
  ControllerEssentialLink,
} from '../../component/essentialLink/controller.jsx';

const props = withDefaults(
  defineProps<ControllerEssentialLinkProps>(),
  ControllerEssentialLink.$propsDefault,
);
const emit = defineEmits<ControllerEssentialLinkEmits>();
useController(props, emit, ControllerEssentialLink, undefined, undefined);
</script>

<template>
  <template />
</template>
