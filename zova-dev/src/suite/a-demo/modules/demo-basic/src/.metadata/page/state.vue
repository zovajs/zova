<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageState } from '../../page/state/controller.jsx';
import { RenderPageState } from '../../page/state/render.jsx';
useControllerPage(ControllerPageState, RenderPageState, undefined);
</script>
