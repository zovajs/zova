<script setup lang="ts">
</script>

<template>
  <ZFormField
    name="name"
    render="text"
  />
  <slot name="header" />
  <slot />
  <slot name="footer" />
</template>
