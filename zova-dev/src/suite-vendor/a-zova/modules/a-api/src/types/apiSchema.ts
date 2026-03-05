import 'zova';

export interface IApiSchemaFetchOptions {
  authToken?: boolean;
}

declare module 'zova' {
  export interface IBeanSceneRecord {
    apiSchema: never;
  }
}
