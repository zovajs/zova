<script setup lang="ts">
import type {
  ControllerLayoutEmptyEmits,
  ControllerLayoutEmptyProps,
} from '../../component/layoutEmpty/controller.jsx';
import { useController } from 'zova';
import {
  ControllerLayoutEmpty,
} from '../../component/layoutEmpty/controller.jsx';

const props = withDefaults(
  defineProps<ControllerLayoutEmptyProps>(),
  ControllerLayoutEmpty.$propsDefault,
);
const emit = defineEmits<ControllerLayoutEmptyEmits>();
useController(props, emit, ControllerLayoutEmpty, undefined, undefined);
</script>

<template>
  <template />
</template>
