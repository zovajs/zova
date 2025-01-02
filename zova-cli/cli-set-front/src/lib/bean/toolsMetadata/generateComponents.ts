import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateComponents(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/component/*/index.vue`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentImports2: string[] = [];
  const contentComponents: string[] = [];
  const contentRecords: string[] = [];
  const contentRecords2: string[] = [];
  for (const file of files) {
    const componentName = path.basename(file.substring(0, file.length - '/index.vue'.length));
    const className = 'Controller' + toUpperCaseFirstChar(componentName);
    const componentFullName = `${moduleName}:${componentName}`;
    const componentName2 = 'Z' + firstCharToUpperCase(componentName);
    contentExports.push(`export * from '../component/${componentName}/controller.js';`);
    contentImports.push(
      `import { ${className}, ${className}Emits, ${className}Slots } from '../component/${componentName}/controller.js';`,
    );
    contentImports2.push(`export { default as ${componentName2} } from '../component/${componentName}/index.vue';`);
    contentImports2.push(`import ${componentName2} from '../component/${componentName}/index.vue';`);
    contentComponents.push(`'${componentName}': ${componentName2},`);
    contentRecords.push(`'${componentFullName}': ${className};`);
    contentRecords2.push(`export interface ${className}Props {
  controllerRef?: (ref: ${className}) => void;
  slots?: ${className}Slots;
}

export interface ${className} {
  $props: RequiredSome<${className}Props, keyof typeof ${className}.$propsDefault>;
  $emit: ${className}Emits;
  $slots: ${className}Slots;
}`);
  }
  // combine
  let content = `/** components: begin */
${contentExports.join('\n')}
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
  if (content.includes('RequiredSome')) {
    content = `import { RequiredSome } from 'zova';\n${content}`;
  }
  return content;
}

function firstCharToUpperCase(name: string) {
  return name.charAt(0).toUpperCase() + name.substring(1);
}
