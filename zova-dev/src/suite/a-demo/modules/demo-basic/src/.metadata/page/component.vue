<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageComponent } from '../../page/component/controller.jsx';
import { RenderPageComponent } from '../../page/component/render.jsx';
useControllerPage(ControllerPageComponent, RenderPageComponent, undefined);
</script>
