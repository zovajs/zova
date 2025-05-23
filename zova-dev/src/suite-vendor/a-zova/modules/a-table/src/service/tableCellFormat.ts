import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanBase, cast, Use } from 'zova';
import { Service, SysOnion, TypeComposer } from 'zova-module-a-bean';
import { ITableCellFormatRender, TypeTableCellFormatsMatched } from '../types/tableCellFormat.js';

@Service()
export class ServiceTableCellFormat extends BeanBase {
  @Use()
  $$sysOnion: SysOnion;

  async loadTableCellFormatsMatched(properties: SchemaObject[] | undefined): Promise<TypeTableCellFormatsMatched> {
    const formats: TypeTableCellFormatsMatched = {};
    if (properties) {
      for (const property of properties) {
        formats[property.key!] = await this._cretePropertyComposer(property);
      }
    }
    return formats;
  }

  async _cretePropertyComposer(property?: SchemaObject): Promise<TypeComposer | undefined> {
    if (!property) return undefined;
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
