import type { ZovaApplication } from 'zova';
import { setErrorMapDefault, setErrorMapSchema } from '@cabloy/zod-errors-custom';

export function errorsAdapter(app: ZovaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
}
