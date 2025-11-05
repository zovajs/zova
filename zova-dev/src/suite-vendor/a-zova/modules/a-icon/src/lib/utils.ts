import type { VNode } from 'vue';
import type { IIconRecord } from '../types/icon.js';
import { createVNode } from 'vue';
import { ZIcon } from '../.metadata/index.js';

export function $iconh<K extends keyof IIconRecord>(name: K, color?: string, size?: string | number): VNode {
  return createVNode(ZIcon, {
    name,
    color,
    width: size,
    height: size,
  });
}

export function icon<K extends keyof IIconRecord>(name: K): K {
  return name;
}
