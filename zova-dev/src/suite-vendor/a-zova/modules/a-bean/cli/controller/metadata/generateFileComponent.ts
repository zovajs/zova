import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.ts';
import path from 'node:path';
import { combineResourceName } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { combineContentRenderAndStyle, generateRestIndex } from './utils.ts';

export async function generateFileComponent(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { moduleName } = options;
  const { className } = globFile;
  const {
    name,
    nameCapitalize,
    controllerExtJs,
    hasComponentOptions,
    nameProps,
    hasProps,
    hasGeneric,
    nameModels,
    hasModels,
    hasModelValue,
    generic,
    genericKeys,
    importRenderFirst,
    hasRenderFirst,
    classNameRenderFirst,
    importStyleFirst,
    hasStyleFirst,
    classNameStyleFirst,
  } = controllerInfo;
  const contentImports: string[] = [];
  const genericDeclare = hasGeneric ? `<${generic}>` : '';
  const genericArguments = hasGeneric ? `<${genericKeys?.join(',')}>` : '';
  const componentOptions = hasComponentOptions ? `Controller${nameCapitalize}.$componentOptions` : '';
  // import
  const _contentImportTypeZova: string[] = [];
  if (hasModels) _contentImportTypeZova.push('DefineModelOptions', 'TypePropUpdateFromModel', 'TypePropValueFromModel');
  if (hasProps) _contentImportTypeZova.push('TypeControllerInnerProps');
  if (_contentImportTypeZova.length > 0) {
    contentImports.push(`import type { ${_contentImportTypeZova.join(', ')} } from 'zova';`);
  }
  const _contentImportTypeController: string[] = [];
  if (hasModels) _contentImportTypeController.push(nameModels);
  if (hasProps)_contentImportTypeController.push(nameProps);
  if (_contentImportTypeController.length > 0) {
    contentImports.push(`import type { ${_contentImportTypeController.join(', ')} } from '../../component/${name}/controller${controllerExtJs}';`);
  }
  contentImports.push("import { defineComponent } from 'vue'");
  contentImports.push("import { prepareComponentOptions, useController } from 'zova';");
  // controller
  contentImports.push(
    `import { ${className} } from '../../component/${name}/controller${controllerExtJs}';`,
  );
  // render
  if (hasRenderFirst) {
    contentImports.push(importRenderFirst);
  }
  // style
  if (hasStyleFirst) {
    contentImports.push(importStyleFirst);
  }
  // TypeControllerPublicProps
  const typeControllerPublicPropsName = `TypeController${nameCapitalize}PublicProps`;
  let contentTypeControllerPublicProps = `export type ${typeControllerPublicPropsName}${genericDeclare} = {
    controllerRef?: (ref: ${className}${genericArguments}) => void;
  }`;
  if (hasProps) {
    contentTypeControllerPublicProps += ` & ${nameProps}${genericArguments}`;
  }
  if (hasModels) {
    contentTypeControllerPublicProps += ` & ${nameModels}${genericArguments} &
{
  [KEY in keyof ${nameModels}${genericArguments} as TypePropValueFromModel<KEY>]: ${nameModels}${genericArguments}[KEY];
} &
{
  [KEY in keyof ${nameModels}${genericArguments} as TypePropUpdateFromModel<KEY>]: (value: ${nameModels}${genericArguments}[KEY]) => void;
};`;
  }
  // TypeModelArguments
  let contentTypeModelArguments = '';
  if (hasModels) {
    contentTypeModelArguments = `type TypeModelArguments${genericDeclare} = {
      [KEY in keyof ${nameModels}${genericArguments} as TypePropValueFromModel<KEY>]: ${nameModels}${genericArguments}[KEY];
    };`;
  }
  // ControllerInnerProps
  let contentControllerInnerProps = '';
  if (hasProps) {
    let contentControllerInnerProps_models = '';
    if (hasModels) {
      contentControllerInnerProps_models = ` & {
        [KEY in keyof ${nameModels}${genericArguments} as TypePropValueFromModel<KEY>]: ${nameModels}${genericArguments}[KEY];
      }`;
    }
    contentControllerInnerProps = `type ControllerInnerProps${genericDeclare} =
      TypeControllerInnerProps<${nameProps}${genericArguments}${contentControllerInnerProps_models}, keyof typeof ${className}.$propsDefault>;`;
  }
  // Controller
  const contentControllerInterfaceMethods: string[] = [];
  if (hasProps) {
    contentControllerInterfaceMethods.push(`$props: ControllerInnerProps${genericArguments};`);
  }
  if (hasModels) {
    contentControllerInterfaceMethods.push(`$useModel<K extends keyof TypeModelArguments${genericArguments}>(name: K, options?: DefineModelOptions<TypeModelArguments${genericArguments}[K]>): ControllerInnerProps${genericArguments}[K];`);
  }
  if (hasModelValue) {
    contentControllerInterfaceMethods.push(`$useModel(options?: DefineModelOptions<TypeModelArguments${genericArguments}['modelValue']>): ControllerInnerProps${genericArguments}['modelValue'];`);
  }
  let contentControllerInterface = '';
  if (hasProps || hasModels) {
    contentControllerInterface = `declare module 'zova-module-${moduleName}' {
      export interface ${className}${genericDeclare} {
        ${contentControllerInterfaceMethods.join('\n')}
      }
    }`;
  }
  // component
  const contentComponent = `export const Z${nameCapitalize} = defineComponent(
    ${genericDeclare}(_props: ${typeControllerPublicPropsName}${genericArguments}) => {
      useController(${className}, ${hasRenderFirst ? classNameRenderFirst : undefined}, ${hasStyleFirst ? classNameStyleFirst : undefined});
      return () => {};
    },
    prepareComponentOptions(${componentOptions}),
  );`;
  // content
  const content = `${contentImports.join('\n')}
${contentTypeControllerPublicProps}
${contentTypeModelArguments}
${contentControllerInnerProps}
${contentControllerInterface}
${combineContentRenderAndStyle(controllerInfo, moduleName, className, genericDeclare, genericArguments)}
${contentComponent}
`;
  // restComponent
  await generateRestComponent(options, globFile, controllerInfo, genericDeclare, genericArguments, _contentImportTypeController);
  // ok
  return content;
}

async function generateRestComponent(
  options: IMetadataCustomGenerateOptions,
  _globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
  genericDeclare: string,
  genericArguments: string,
  _contentImportTypeController: string[],
) {
  const { moduleName, modulePath } = options;
  // const { className } = globFile;
  const { name, nameProps, controllerExtJs } = controllerInfo;
  // import
  const contentImports: string[] = [];
  if (_contentImportTypeController.length > 0) {
    contentImports.push(`import type { ${_contentImportTypeController.join(', ')} } from '../../src/component/${name}/controller${controllerExtJs}';`);
  }
  // component
  const componentName = `Z${toUpperCaseFirstChar(combineResourceName(name, moduleName, false, false))}`;
  const contentComponent = `export function ${componentName}${genericDeclare}(_props: ${nameProps}${genericArguments}) {
  return '${moduleName}:${name}';
}`;
  // content
  const content = `${contentImports.join('\n')}

${contentComponent}
`;
  // output
  const fileDest = path.join(modulePath, `rest/component/${name}.ts`);
  await fse.outputFile(fileDest, content);
  // components
  const fileComponents = path.join(modulePath, 'rest/components.ts');
  let contentComponents = '';
  if (fse.existsSync(fileComponents)) {
    contentComponents = (await fse.readFile(fileComponents)).toString();
  }
  const exportContent = `export * from './component/${name}.js';`;
  if (!contentComponents.includes(exportContent)) {
    contentComponents = `${contentComponents}${exportContent}\n`;
    await fse.outputFile(fileComponents, contentComponents);
  }
  // index
  const exportIndexContent = 'export * from \'./components.js\';';
  await generateRestIndex(modulePath, exportIndexContent);
}
