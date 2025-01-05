<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerPage, ControllerPageProps, ControllerPageEmits } from '../../component/page/controller.jsx';
import { RenderPage } from '../../component/page/render.jsx';
import { StylePage } from '../../component/page/style.js';
const props = withDefaults(defineProps<ControllerPageProps>(), ControllerPage.$propsDefault);
const emit = defineEmits<ControllerPageEmits>();
useController(props, emit, ControllerPage, RenderPage, StylePage);
</script>
