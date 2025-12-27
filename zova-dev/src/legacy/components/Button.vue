<script setup lang="ts">
const props = defineProps({
  onPerform: Function,
});
const emits = defineEmits<{
  (e: 'click', message: string): void;
}>();
function onClick() {
  props.onPerform?.('onPerform');
  emits('click', 'onClick');
}
</script>

<template>
  <button class="btn btn-primary" @click="onClick">
    Click
  </button>
</template>
