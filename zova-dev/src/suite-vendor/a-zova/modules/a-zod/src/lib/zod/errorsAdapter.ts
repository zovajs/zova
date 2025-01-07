import { ZovaApplication } from 'zova';
import { setErrorMapDefault, setErrorMapSchema } from '@cabloy/zod-errors-custom';

export function errorsAdapter(app: ZovaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
}
