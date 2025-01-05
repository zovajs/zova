<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLegacy } from '../../page/legacy/controller.jsx';
import { RenderPageLegacy } from '../../page/legacy/render.jsx';
import { StylePageLegacy } from '../../page/legacy/style.js';
useControllerPage(ControllerPageLegacy, RenderPageLegacy, StylePageLegacy);
</script>
