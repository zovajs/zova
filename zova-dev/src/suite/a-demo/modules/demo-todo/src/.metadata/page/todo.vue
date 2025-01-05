<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageTodo } from '../../page/todo/controller.jsx';
import { RenderPageTodo } from '../../page/todo/render.jsx';
import { StylePageTodo } from '../../page/todo/style.js';
useControllerPage(ControllerPageTodo, RenderPageTodo, StylePageTodo);
</script>
