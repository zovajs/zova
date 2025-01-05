<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageRouteQuery } from '../../page/routeQuery/controller.jsx';
import { RenderPageRouteQuery } from '../../page/routeQuery/render.jsx';
import { StylePageRouteQuery } from '../../page/routeQuery/style.js';
useControllerPage(ControllerPageRouteQuery, RenderPageRouteQuery, StylePageRouteQuery);
</script>
