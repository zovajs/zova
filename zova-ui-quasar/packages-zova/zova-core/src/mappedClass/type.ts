import type { MetadataKey } from '../core/sys/metadata.js';

export const SymbolMappedClassMetadataKeys = Symbol('SymbolMappedClassMetakeys');

export type MappedClassMetadataKeys = Record<MetadataKey, IMappedClassMetadataOptions | undefined>;

export interface IMappedClassMetadataOptions {
  partialClass?: Function;
}
