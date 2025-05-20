import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanBase, Use } from 'zova';
import { Service, SysOnion, TypeComposer } from 'zova-module-a-bean';

@Service()
export class ServiceTableCellFormat extends BeanBase {
  @Use()
  $$sysOnion: SysOnion;

  async loadTableCellFormatsMatched(
    schema: SchemaObject | undefined,
    propertiesCustom: Record<string, SchemaObject> | undefined,
  ): Promise<Record<string, TypeComposer | undefined>> {
    const properties: Record<string, TypeComposer | undefined> = {};
    if (schema?.properties) {
      for (const key in schema.properties) {
        const property = schema.properties[key] as SchemaObject;
        properties[key] = await this._cretePropertyComposer(property);
      }
    }
    if (propertiesCustom) {
      for (const key in propertiesCustom) {
        const property = propertiesCustom[key];
        properties[key] = await this._cretePropertyComposer(property);
      }
    }
    return properties;
  }

  async _cretePropertyComposer(property?: SchemaObject): Promise<TypeComposer | undefined> {
    if (!property) return undefined;
  }
}
