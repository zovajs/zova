<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageRouteParams } from '../../page/routeParams/controller.jsx';
import { RenderPageRouteParams } from '../../page/routeParams/render.jsx';
import { StylePageRouteParams } from '../../page/routeParams/style.js';
useControllerPage(ControllerPageRouteParams, RenderPageRouteParams, StylePageRouteParams);
</script>
