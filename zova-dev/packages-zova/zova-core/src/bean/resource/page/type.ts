import type { z } from 'zod';

export interface ZovaConfigRoutes {}
export interface IPagePathRecord {}
export interface IPageNameRecord {}

export interface TypePageParamsQuery<Q = unknown, P = unknown> {
  query?: Q;
  params?: P;
}

export interface TypePageSchema { params?: z.ZodTypeAny; query: z.ZodTypeAny }
export type TypePageSchemas = Record<string, TypePageSchema>;
