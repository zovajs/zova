import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.js';

export function generateMetaComponent(
  options: IMetadataCustomGenerateOptions,

  globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  if (globFiles.length === 0) return '';
  const { moduleName } = options;
  const contentImports: string[] = [];
  const contentImports2: string[] = [];
  const contentComponents: string[] = [];
  const contentRecords: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
    const { className } = globFile;
    const {
      name,
      nameCapitalize,
      controllerExtJs,
      nameEmits,
      hasEmits,
      nameSlots,
      hasSlots,
    } = controllerInfo;
    const componentFullName = `${moduleName}:${name}`;
    const componentName2 = `Z${nameCapitalize}`;
    const _contentImports_parts: string[] = [];
    if (hasEmits) _contentImports_parts.push(nameEmits);
    if (hasSlots) _contentImports_parts.push(nameSlots);
    if (_contentImports_parts.length > 0) {
      contentImports.push(
        `import { ${_contentImports_parts.join(', ')} } from '../component/${name}/controller${controllerExtJs}';`,
      );
    }
    contentImports2.push(`export { default as ${componentName2} } from './component/${name}.vue';`);
    contentImports2.push(`import ${componentName2} from './component/${name}.vue';`);
    contentComponents.push(`'${name}': ${componentName2},`);
    contentRecords.push(`'${componentFullName}': ${className};`);
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
