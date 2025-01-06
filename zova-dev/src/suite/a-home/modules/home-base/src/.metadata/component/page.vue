<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerPage, ControllerPageProps, ControllerPageEmits } from '../../component/page/controller.jsx';
const props = withDefaults(defineProps<ControllerPageProps>(), ControllerPage.$propsDefault);
const emit = defineEmits<ControllerPageEmits>();
useController(props, emit, ControllerPage, undefined, undefined);
</script>
