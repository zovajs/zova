import { defineSsrMiddleware } from '@quasar/app-vite/wrappers';
// @ts-ignore ignore
import { env } from 'app/.zova/.env.js';
// This middleware should execute as first one
// since it prepare the process.env variables

export default defineSsrMiddleware(({ app: _app, resolve: _resolve, render: _render, serve: _serve }) => {
  for (const key of Object.keys(env)) {
    if (process.env[key] === undefined && env[key] !== false) {
      process.env[key] = env[key];
    }
  }
});
