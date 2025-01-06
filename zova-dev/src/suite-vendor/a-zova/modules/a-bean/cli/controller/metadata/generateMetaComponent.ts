import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';

export function generateMetaComponent(
  options: IMetadataCustomGenerateOptions,
  // eslint-disable-next-line no-undef
  globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  if (globFiles.length === 0) return '';
  const { moduleName } = options;
  const contentImports: string[] = [];
  const contentImports2: string[] = [];
  const contentComponents: string[] = [];
  const contentRecords: string[] = [];
  const contentRecords2: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
    const { className } = globFile;
    const {
      name,
      nameCapitalize,
      controllerExtJs,
      nameProps,
      hasProps,
      nameEmits,
      hasEmits,
      nameSlots,
      hasSlots,
      hasModel,
      hasModelValue,
    } = controllerInfo;
    const componentFullName = `${moduleName}:${name}`;
    const componentName2 = 'Z' + nameCapitalize;
    const _contentImports_parts: string[] = [];
    if (hasEmits) _contentImports_parts.push(nameEmits);
    if (hasSlots) _contentImports_parts.push(nameSlots);
    if (_contentImports_parts.length > 0) {
      contentImports.push(
        `import { ${_contentImports_parts.join(', ')} } from '../component/${name}/controller${controllerExtJs}';`,
      );
    }
    contentImports2.push(`export { default as ${componentName2} } from './component/${name}.vue';`);
    contentImports2.push(`import { default as ${componentName2} } from './component/${name}.vue';`);
    contentComponents.push(`'${name}': ${componentName2},`);
    contentRecords.push(`'${componentFullName}': ${className};`);
    if (hasProps) {
      contentRecords2.push(`export interface ${nameProps} {
        controllerRef?: (ref: ${className}) => void;
        ${hasSlots ? `slots?: ${nameSlots};` : ''} 
      }
      `);
    }
    const _contentRecords_parts: string[] = [];
    if (hasProps)
      _contentRecords_parts.push(`$props: RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>;`);
    if (hasEmits) _contentRecords_parts.push(`$emit: ${nameEmits};`);
    if (hasSlots) _contentRecords_parts.push(`$slots: ${nameSlots};`);
    if (hasModel) {
      _contentRecords_parts.push(
        `$useModel<K extends keyof ${nameProps}>(name: K, options?: DefineModelOptions<${nameProps}[K]>): RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>[K];`,
      );
      if (hasModelValue) {
        _contentRecords_parts.push(
          `$useModel(options?: DefineModelOptions<${nameProps}['modelValue']>): RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>['modelValue'];`,
        );
      }
    }
    if (_contentRecords_parts.length > 0) {
      contentRecords2.push(`export interface ${className} {
        ${_contentRecords_parts.join('\n')}
      }`);
    }
  }
  // combine
  let content = `/** components: begin */
${contentImports.join('\n')}
${contentImports2.join('\n')}
export const components = {
  ${contentComponents.join('\n')}
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  ${contentRecords.join('\n')}
}
}
declare module 'zova-module-${moduleName}' {
  ${contentRecords2.join('\n')} 
}  
/** components: end */
`;
  // RequiredSome / DefineModelOptions
  const _imports_parts: string[] = [];
  ['RequiredSome', 'DefineModelOptions'].forEach(item => {
    if (content.includes(item)) _imports_parts.push(item);
  });
  if (_imports_parts.length > 0) {
    content = `import { ${_imports_parts.join(', ')} } from 'zova';\n${content}`;
  }
  return content;
}
