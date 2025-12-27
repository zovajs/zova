<script setup lang="ts">
</script>

<template>
  <ZFormField
    {...this.$props}
    render="text"
  />
  <slot name="header" />
  <slot />
  <slot name="footer" />
</template>
