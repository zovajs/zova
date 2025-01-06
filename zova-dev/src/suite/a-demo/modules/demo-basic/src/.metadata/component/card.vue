<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerCard, ControllerCardProps, ControllerCardEmits } from '../../component/card/controller.jsx';
const props = withDefaults(defineProps<ControllerCardProps>(), ControllerCard.$propsDefault);
const emit = defineEmits<ControllerCardEmits>();
useController(props, emit, ControllerCard, undefined, undefined);
</script>
