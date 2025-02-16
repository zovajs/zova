<script setup lang="ts">
import type { ControllerCardEmits, ControllerCardProps } from '../../component/card/controller.jsx';
import { useController } from 'zova';
import { ControllerCard } from '../../component/card/controller.jsx';

const props = withDefaults(defineProps<ControllerCardProps>(), ControllerCard.$propsDefault);
const emit = defineEmits<ControllerCardEmits>();
useController(props, emit, ControllerCard, undefined, undefined);
</script>

<template>
  <template />
</template>
