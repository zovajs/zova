<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerBehavior, ControllerBehaviorProps } from '../../component/behavior/controller.jsx';
defineOptions(ControllerBehavior.$componentOptions);
const props = withDefaults(defineProps<ControllerBehaviorProps>(), ControllerBehavior.$propsDefault);

useController(props, undefined, ControllerBehavior, undefined, undefined);
</script>
