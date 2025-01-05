<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPagePinia } from '../../page/pinia/controller.jsx';
import { RenderPagePinia } from '../../page/pinia/render.jsx';
import { StylePagePinia } from '../../page/pinia/style.js';
useControllerPage(ControllerPagePinia, RenderPagePinia, StylePagePinia);
</script>
