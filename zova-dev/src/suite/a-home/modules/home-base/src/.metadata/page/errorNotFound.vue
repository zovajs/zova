<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageErrorNotFound } from '../../page/errorNotFound/controller.jsx';
import { RenderPageErrorNotFound } from '../../page/errorNotFound/render.jsx';
import { StylePageErrorNotFound } from '../../page/errorNotFound/style.js';
useControllerPage(ControllerPageErrorNotFound, RenderPageErrorNotFound, StylePageErrorNotFound);
</script>
