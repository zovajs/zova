import type { App } from 'vue';
import { bootstrap } from 'zova';

export default async function ({ app }: { app: App }) {
  await bootstrap({ app });
}
