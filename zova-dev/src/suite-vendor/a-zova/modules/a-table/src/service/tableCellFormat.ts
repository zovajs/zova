import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanBase, cast, deepExtend, Use } from 'zova';
import { Service, SysOnion, TypeComposer } from 'zova-module-a-bean';
import { ITableCellFormatRender } from '../types/tableCellFormat.js';

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
    if (property.rest?.table) {
      property = deepExtend({}, property, { rest: property.rest?.table });
    }
    const onionSlices = await this.$$sysOnion.tableCellFormat.loadOnionsFromPackage(true, undefined, property);
    if (!onionSlices || onionSlices.length === 0) return undefined;
    for (const onionSlice of onionSlices) {
      onionSlice.beanInstance = await this.sys.bean._getBean(onionSlice.beanFullName as any, true);
    }
    return this.$$sysOnion.tableCellFormat.compose(onionSlices, (onionSlice, props: any, next) => {
      const beanInstance = cast<ITableCellFormatRender>(onionSlice.beanInstance);
      return cast(beanInstance).render(props, onionSlice.options, next as any);
    });
  }
}
