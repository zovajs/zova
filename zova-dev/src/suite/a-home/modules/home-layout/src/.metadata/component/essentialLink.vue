<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import {
  ControllerEssentialLink,
  ControllerEssentialLinkProps,
  ControllerEssentialLinkEmits,
} from '../../component/essentialLink/controller.jsx';
const props = withDefaults(defineProps<ControllerEssentialLinkProps>(), ControllerEssentialLink.$propsDefault);
const emit = defineEmits<ControllerEssentialLinkEmits>();
useController(props, emit, ControllerEssentialLink, undefined, undefined);
</script>
