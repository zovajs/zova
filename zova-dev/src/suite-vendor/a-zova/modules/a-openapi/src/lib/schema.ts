import type { OperationObject, ParameterObject, RequestBodyObject, SchemaObject } from 'openapi3-ts/oas31';
import type { TypeSchemaScene } from '../types/rest.js';
import jsonSchemaToZod from '@cabloy/json-schema-to-zod';
import { evaluateSimple } from '@cabloy/utils';
import { toRaw } from 'vue';
import { z } from 'zod';
import { cast, deepExtend } from 'zova';
import { OrderUnknownBase } from '../types/database.js';

const __FilterColumnsIgnore = ['columns', 'where', 'orders', 'pageNo', 'pageSize'];

export function schemaToZodSchema<T extends z.ZodType = z.ZodType>(schema: SchemaObject): T {
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
    result.push(property);
  }
  // sort
  result.sort((a, b) => {
    return (a.rest?.order ?? OrderUnknownBase) - (b.rest?.order ?? OrderUnknownBase);
  });
  // ok
  return result;
}

export function getSchemaOfRequestBody(operationObject?: OperationObject): SchemaObject | undefined {
  return cast<RequestBodyObject>(operationObject?.requestBody)?.content?.['application/json']?.schema as any;
}

export function getSchemaOfResponseBody(operationObject?: OperationObject): SchemaObject | undefined {
  return operationObject?.responses?.['200']?.content?.['application/json']?.schema;
}

export function getSchemaOfRequestQuery(operationObject?: OperationObject): SchemaObject | undefined {
  const parameters = operationObject?.parameters;
  if (!parameters) return;
  const schema: SchemaObject = { type: 'object', required: [], properties: {} };
  for (const _parameter of parameters) {
    const parameter = _parameter as ParameterObject;
    if (parameter.in !== 'query') continue;
    const name = parameter.name;
    const fieldSchema = parameter.schema! as SchemaObject;
    schema.properties![name] = fieldSchema;
    if (parameter.required) schema.required!.push(name);
  }
  return schema;
}

export function getSchemaOfRequestQueryFilter(operationObject?: OperationObject, options?: { where?: boolean; order?: boolean }) {
  const parameters = operationObject?.parameters;
  if (!parameters) return;
  const schema: SchemaObject = { type: 'object', required: [], properties: {} };
  for (const _parameter of parameters) {
    const parameter = _parameter as ParameterObject;
    if (parameter.in !== 'query') continue;
    const name = parameter.name;
    if (__FilterColumnsIgnore.includes(name)) continue;
    const fieldSchema = parameter.schema! as SchemaObject;
    if (
      (options?.where === true && fieldSchema.filter?.capabilities?.where !== false) ||
      (options?.order === true && fieldSchema.filter?.capabilities?.order !== false)
    ) {
      schema.properties![name] = fieldSchema;
      if (parameter.required) schema.required!.push(name);
    }
  }
  return schema;
}
