<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageIndex } from '../../page/index/controller.jsx';
import { RenderPageIndex } from '../../page/index/render.jsx';
import { StylePageIndex } from '../../page/index/style.js';
useControllerPage(ControllerPageIndex, RenderPageIndex, StylePageIndex);
</script>
