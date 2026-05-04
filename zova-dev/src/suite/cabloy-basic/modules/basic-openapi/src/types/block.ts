import 'zova-module-a-openapi';
import type { IResourceBlockOptionsPageEntry } from 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentBlockRecord {
    BlockPageEntry?: IResourceBlockOptionsPageEntry;
  }
}
