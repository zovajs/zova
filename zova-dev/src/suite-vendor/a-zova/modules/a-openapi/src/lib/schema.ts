import type { SchemaObject } from 'openapi3-ts/oas31';
import { evaluateSimple } from '@cabloy/utils';
import jsonSchemaToZod from 'json-schema-to-zod';
import { z } from 'zod';

export function schemaToZodSchema<T extends z.ZodType = z.ZodAny>(schema: SchemaObject): T {
  const code = jsonSchemaToZod(schema);
  return evaluateSimple(code, { z });
}
