<script setup lang="ts">
import type { PropsBase } from 'zova';
import type { ControllerBehaviorSlots } from '../../component/behavior/controller.jsx';
import { useController } from 'zova';
import { ControllerBehavior } from '../../component/behavior/controller.jsx';

const props = defineProps<PropsBase<ControllerBehavior, ControllerBehaviorSlots>>();

useController(props, undefined, ControllerBehavior, undefined, undefined);
</script>

<template>
  <template />
</template>
