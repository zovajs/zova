import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.ts';

export function generateFileComponent(
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
    classNameRenderOthers,
    importRenderOthers,
    importStyleFirst,
    hasStyleFirst,
    classNameStyleFirst,
    classNameStyleOthers,
    importStyleOthers,
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
  contentImports.push(...importRenderOthers);
  // style
  if (hasStyleFirst) {
    contentImports.push(importStyleFirst);
  }
  contentImports.push(...importStyleOthers);
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
  const contentControllerInterfaceRecords: string[] = [];
  if (hasStyleFirst) {
    contentControllerInterfaceRecords.push(`export interface ${classNameStyleFirst}${genericDeclare} extends ${className}${genericArguments} {}`);
  }
  if (hasRenderFirst) {
    if (hasStyleFirst) {
      contentControllerInterfaceRecords.push(`export interface ${classNameRenderFirst}${genericDeclare} extends ${classNameStyleFirst}${genericArguments} {}`);
    } else {
      contentControllerInterfaceRecords.push(`export interface ${classNameRenderFirst}${genericDeclare} extends ${className}${genericArguments} {}`);
    }
  }
  let contentControllerInterface = '';
  if (hasProps || hasModels) {
    contentControllerInterface = `declare module 'zova-module-${moduleName}' {
      export interface ${className}${genericDeclare} {
        ${contentControllerInterfaceMethods.join('\n')}
      }
      ${contentControllerInterfaceRecords.join('\n')}
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
${contentComponent}
`;
  return content;
}
