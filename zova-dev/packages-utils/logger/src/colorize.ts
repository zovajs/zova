import { LEVEL, MESSAGE } from './types.js';

/*
 * Colorizer format. Wraps the `level` and/or `message` properties
 * of the `info` objects with ANSI color codes based on a few options.
 */
class Colorizer {
  options: object;
  constructor(opts) {
    this.options = opts;
  }

  /*
   * function colorize (lookup, level, message)
   * Performs multi-step colorization using @colors/colors/safe
   */
  colorize(lookup, level, message) {
    return `\\x1b[31m${lookup}\\x1b[39m`;
    // if (typeof message === 'undefined') {
    //   message = level;
    // }

    // //
    // // If the color for the level is just a string
    // // then attempt to colorize the message with it.
    // //
    // if (!Array.isArray(Colorizer.allColors[lookup])) {
    //   return colors[Colorizer.allColors[lookup]](message);
    // }

    // //
    // // If it is an Array then iterate over that Array, applying
    // // the colors function for each item.
    // //
    // for (let i = 0, len = Colorizer.allColors[lookup].length; i < len; i++) {
    //   message = colors[Colorizer.allColors[lookup][i]](message);
    // }

    // return message;
  }

  /*
   * function transform (info, opts)
   * Attempts to colorize the { level, message } of the given
   * `logform` info object.
   */
  transform(info, _opts) {
    info[LEVEL] = this.colorize(info[LEVEL], info.level, info[MESSAGE]);
    // if (opts.all && typeof info[MESSAGE] === 'string') {
    //   info[MESSAGE] = this.colorize(info[LEVEL], info.level, info[MESSAGE]);
    // }

    // if (opts.level || opts.all || !opts.message) {
    //   info.level = this.colorize(info[LEVEL], info.level);
    // }

    // if (opts.all || opts.message) {
    //   info.message = this.colorize(info[LEVEL], info.level, info.message);
    // }

    return info;
  }
}

export function colorizer(opts?) {
  return new Colorizer(opts);
}
