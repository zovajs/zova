import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanBase, Use } from 'zova';
import { Service, SysOnion } from 'zova-module-a-bean';

@Service()
export class ServiceTableCellFormat extends BeanBase {
  @Use()
  $$sysOnion: SysOnion;

  async loadTableCellFormatsMatched(_schema: SchemaObject, _propertiesCustom: Record<string, SchemaObject>) {
    // const properties:Record<string, = [];
  }
}
