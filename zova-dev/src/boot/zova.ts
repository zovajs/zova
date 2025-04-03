import { defineBoot } from '@quasar/app-vite/wrappers';
import { bootstrap } from 'zova';

export default defineBoot(async ({ app }) => {
  await bootstrap({ app });
});
