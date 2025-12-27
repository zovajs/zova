import type { ComponentPublicInstance } from 'vue';
import type { Constructable } from 'zova-core';

export interface TypeRenderComponentJsxProps {
  'children': TypeRenderComponentJsx | TypeRenderComponentJsx[];
  'v-if'?: string | boolean;
  'v-for'?: string | any[];
  'v-each'?: string;
  'v-slot'?: string;
  'v-slot-scope'?: string;
  // 'key'?: string;
  // [key: string]: any | undefined;
}
export interface TypeRenderComponentJsx {
  type: string;
  key?: string | null;
  props?: TypeRenderComponentJsxProps;
};

export type TypeRenderComponentNormal =
  Constructable<ComponentPublicInstance> | string;

export type TypeRenderComponent = TypeRenderComponentNormal | TypeRenderComponentJsx;

export interface IFormProviderComponents {}
