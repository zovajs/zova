<script setup lang="ts">
import type { ControllerBehaviorProps } from '../../component/behavior/controller.jsx';
import { useController } from 'zova';
import { ControllerBehavior } from '../../component/behavior/controller.jsx';

defineOptions(ControllerBehavior.$componentOptions);
const props = withDefaults(defineProps<ControllerBehaviorProps>(), ControllerBehavior.$propsDefault);

useController(props, undefined, ControllerBehavior, undefined, undefined);
</script>

<template>
  <template />
</template>
