import { TypeRenderComponentJsx } from 'zova-jsx';
import { IIconRecord } from 'zova-module-a-icon';
import 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  export interface ISchemaRenderComponentLayoutOptions {
    class?: any;
    label?: string | false;
    inline?: boolean;
    bordered?: boolean;
    floating?: boolean;
    iconPrefix?: keyof IIconRecord;
    iconSuffix?: keyof IIconRecord;
    header?: TypeRenderComponentJsx | string;
    footer?: TypeRenderComponentJsx | string;
  }
}
