<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController, PropsBase } from 'zova';
import { ControllerBehavior, ControllerBehaviorSlots } from '../../component/behavior/controller.jsx';
const props = defineProps<PropsBase<ControllerBehavior, ControllerBehaviorSlots>>();

useController(props, undefined, ControllerBehavior, undefined, undefined);
</script>
