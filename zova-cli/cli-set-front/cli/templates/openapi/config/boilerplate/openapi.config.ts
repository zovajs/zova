import { OpenAPITSOptions } from 'openapi-typescript';

export default function () {
  return {
    source: 'path/to/openapi.json',
    options: {},
  } as { source: string; options: OpenAPITSOptions };
}
