<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageItem } from '../../page/item/controller.jsx';
import { RenderPageItem } from '../../page/item/render.jsx';
import { StylePageItem } from '../../page/item/style.js';
useControllerPage(ControllerPageItem, RenderPageItem, StylePageItem);
</script>
