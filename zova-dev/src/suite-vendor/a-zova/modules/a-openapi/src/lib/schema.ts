import type { SchemaObject } from 'openapi3-ts/oas31';
import type { TypeSchemaScene } from '../types/rest.js';
import jsonSchemaToZod from '@cabloy/json-schema-to-zod';
import { evaluateSimple } from '@cabloy/utils';
import { toRaw } from 'vue';
import { z } from 'zod';
import { deepExtend } from 'zova';
import { OrderUnknownBase } from '../types/database.js';

export function schemaToZodSchema<T extends z.ZodType = z.ZodAny>(schema: SchemaObject): T {
  const code = jsonSchemaToZod(toRaw(schema));
  return evaluateSimple(code, { z });
}

export function loadSchemaProperties(schema: SchemaObject | undefined, scene: TypeSchemaScene): SchemaObject[] | undefined {
  if (!schema) return;
  const properties = schema.properties!;
  const result: SchemaObject[] = [];
  // filter
  for (const key in properties) {
    let property = properties[key] as SchemaObject;
    property = deepExtend({ key }, property, { rest: property.rest?.[scene] ?? {} });
    if (property.rest?.visible !== false) {
      result.push(property);
    }
  }
  // sort
  result.sort((a, b) => {
    return (a.rest?.order ?? OrderUnknownBase) - (b.rest?.order ?? OrderUnknownBase);
  });
  // ok
  return result;
}
