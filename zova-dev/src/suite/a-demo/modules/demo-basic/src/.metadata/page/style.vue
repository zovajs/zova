<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageStyle } from '../../page/style/controller.jsx';
import { RenderPageStyle } from '../../page/style/render.jsx';
import { StylePageStyle } from '../../page/style/style.js';
useControllerPage(ControllerPageStyle, RenderPageStyle, StylePageStyle);
</script>
