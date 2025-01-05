<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLogin } from '../../page/login/controller.jsx';
import { RenderPageLogin } from '../../page/login/render.jsx';
import { StylePageLogin } from '../../page/login/style.js';
useControllerPage(ControllerPageLogin, RenderPageLogin, StylePageLogin);
</script>
