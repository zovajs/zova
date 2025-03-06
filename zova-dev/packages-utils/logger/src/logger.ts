import type { LoggerOptions } from './types.js';

export class Logger {
  options: LoggerOptions;
  defaultRequestMetadata?: object;

  constructor(options: LoggerOptions, defaultRequestMetadata?: object) {
    this.options = options;
    this.defaultRequestMetadata = defaultRequestMetadata;
  }

  child(defaultRequestMetadata: object): Logger {
    return new Logger(defaultRequestMetadata);
  }

  async end() {
    // donothing
  }
}
