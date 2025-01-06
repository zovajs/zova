<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import {
  ControllerLayoutEmpty,
  ControllerLayoutEmptyProps,
  ControllerLayoutEmptyEmits,
} from '../../component/layoutEmpty/controller.jsx';
const props = withDefaults(defineProps<ControllerLayoutEmptyProps>(), ControllerLayoutEmpty.$propsDefault);
const emit = defineEmits<ControllerLayoutEmptyEmits>();
useController(props, emit, ControllerLayoutEmpty, undefined, undefined);
</script>
