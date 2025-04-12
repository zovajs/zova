import type { VNode } from 'vue';
import type { IIconRecord } from '../types/icon.js';
import { createVNode } from 'vue';
import { ZovaIcon } from './zovaIcon.js';

// should not provide name?: string
// export function iconh(name?: string, color?: string, size?: string | number);
export function iconh<K extends keyof IIconRecord>(name: K, color?: string, size?: string | number): VNode;
export function iconh(name?, color?, size?): VNode {
  size = size ?? 24;
  return createVNode(ZovaIcon, {
    name,
    color,
    width: size,
    height: size,
  });
}

export function icon<K extends keyof IIconRecord>(name: K): K {
  return name;
}
