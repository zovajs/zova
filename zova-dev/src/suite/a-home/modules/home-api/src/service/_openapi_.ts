export interface paths {
  '/': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Home */
    get: operations['Home_index'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_index'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/echo': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_echo'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/vona/test/onion/echo2/{userId}/{userName}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Onion_echo2'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/vona/test/onion/echo3/{userId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_echo3'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/vona/test/onion/echo4': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Onion_echo4'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/vona/test/onion/echo5': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_echo5'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** @description User */
    'vona-test.dto.user': {
      /** @description User Id */
      id: number;
      name: string;
      married: boolean;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  Home_index: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_index: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_echo: {
    parameters: {
      query?: {
        name?: number;
        id?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_echo2: {
    parameters: {
      query: {
        id: number;
        name: string;
        married: boolean;
      };
      header?: never;
      path: {
        userName: string;
        userId: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          /** @description User Id */
          id: number;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['vona-test.dto.user'];
          };
        };
      };
    };
  };
  Onion_echo3: {
    parameters: {
      query?: {
        id?: number;
      };
      header: {
        Accept: string;
      };
      path: {
        userId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_echo4: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['vona-test.dto.user'][];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['vona-test.dto.user'][];
          };
        };
      };
    };
  };
  Onion_echo5: {
    parameters: {
      query?: {
        ids?: number[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
}
