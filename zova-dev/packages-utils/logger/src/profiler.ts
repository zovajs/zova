/**
 * Refactored by zhennann
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

import type { Logger } from './logger.js';
import { LEVEL } from './types.js';

export class Profiler {
  logger: Logger;
  start: number;

  constructor(logger: Logger) {
    this.logger = logger;
    this.start = Date.now();
  }

  done(...args) {
    if (typeof args[args.length - 1] === 'function') {
      console.warn('Callback function no longer supported as of winston@3.0.0');
      args.pop();
    }

    const info = typeof args[args.length - 1] === 'object' ? args.pop() : {};
    info.level = info.level || 'info';
    info[LEVEL] = info.level;
    info.durationMs = (Date.now()) - this.start;

    return this.logger.write(info);
  }
};
