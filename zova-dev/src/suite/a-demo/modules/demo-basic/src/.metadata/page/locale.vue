<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLocale } from '../../page/locale/controller.jsx';
import { RenderPageLocale } from '../../page/locale/render.jsx';
useControllerPage(ControllerPageLocale, RenderPageLocale, undefined);
</script>
