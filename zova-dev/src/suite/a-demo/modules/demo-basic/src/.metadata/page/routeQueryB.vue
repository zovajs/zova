<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageRouteQueryB } from '../../page/routeQueryB/controller.jsx';
import { RenderPageRouteQueryB } from '../../page/routeQueryB/render.jsx';
import { StylePageRouteQueryB } from '../../page/routeQueryB/style.js';
useControllerPage(ControllerPageRouteQueryB, RenderPageRouteQueryB, StylePageRouteQueryB);
</script>
