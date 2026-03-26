export function generateMetaComponent(options, globFiles) {
    if (globFiles.length === 0)
        return '';
    const { moduleName } = options;
    const contentImports = [];
    const contentComponents = [];
    const contentRecords = [];
    const contentRecords2 = [];
    for (const [globFile, controllerInfo] of globFiles) {
        const { className } = globFile;
        const { name, nameCapitalize } = controllerInfo;
        const componentFullName = `${moduleName}:${name}`;
        const componentName2 = `Z${nameCapitalize}`;
        contentImports.push(`export * from './component/${name}.js';`);
        contentImports.push(`import { ${componentName2} } from './component/${name}.js';`);
        contentComponents.push(`'${name}': ${componentName2},`);
        contentRecords.push(`'${componentFullName}': ${className};`);
        contentRecords2.push(`'${componentFullName}': typeof ${componentName2};`);
    }
    // combine
    const content = `/** components: begin */
${contentImports.join('\n')}
export const components = {
  ${contentComponents.join('\n')}
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  ${contentRecords.join('\n')}
}
export interface IZovaComponentRecord {
  ${contentRecords2.join('\n')}
}
}
/** components: end */
`;
    return content;
}
