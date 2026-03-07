import type { IModuleRoute } from 'zova-module-a-router';
import { ZPagePaypalCancel } from './.metadata/page/paypalCancel.js';
import { ZPagePaypalReturn } from './.metadata/page/paypalReturn.js';

export const routes: IModuleRoute[] = [{ path: 'paypalReturn', component: ZPagePaypalReturn }, { path: 'paypalCancel', component: ZPagePaypalCancel }];
