import type { IIconRecord } from './types.js';

export function $iconName<K extends keyof IIconRecord>(name: K): K {
  return name;
}
