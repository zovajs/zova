export class Logger {
  defaultRequestMetadata: object;

  constructor(defaultRequestMetadata: object) {
    this.defaultRequestMetadata = defaultRequestMetadata;
  }

  child(defaultRequestMetadata: object): Logger {
    return new Logger(defaultRequestMetadata);
  }

  async end() {
    // donothing
  }
}
