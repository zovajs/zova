import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.ts';

export function generateMetaComponent(
  options: IMetadataCustomGenerateOptions,

  globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  if (globFiles.length === 0) return '';
  const { moduleName } = options;
  const contentImports: string[] = [];
  const contentComponents: string[] = [];
  const contentRecords: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
    const { className } = globFile;
    const {
      name,
      nameCapitalize,
    } = controllerInfo;
    const componentFullName = `${moduleName}:${name}`;
    const componentName2 = `Z${nameCapitalize}`;
    contentImports.push(`export * from './component/${name}.js';`);
    contentImports.push(`import { ${componentName2} } from './component/${name}.js';`);
    contentComponents.push(`'${name}': ${componentName2},`);
    contentRecords.push(`'${componentFullName}': ${className};`);
  }
  // combine
  let content = `/** components: begin */
${contentImports.join('\n')}
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
