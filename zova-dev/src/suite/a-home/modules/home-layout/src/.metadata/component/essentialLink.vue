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
import { RenderEssentialLink } from '../../component/essentialLink/render.jsx';
const props = withDefaults(defineProps<ControllerEssentialLinkProps>(), ControllerEssentialLink.$propsDefault);
const emit = defineEmits<ControllerEssentialLinkEmits>();
useController(props, emit, ControllerEssentialLink, RenderEssentialLink, undefined);
</script>
