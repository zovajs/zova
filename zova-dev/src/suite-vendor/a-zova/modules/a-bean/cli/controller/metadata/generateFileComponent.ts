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
    hasModel,
    hasModelValue,
    generic,
    genericKeys,
    importRender,
    importStyle,
  } = controllerInfo;
  const contentImports: string[] = [];
  const functionGeneric = hasGeneric ? `<${generic}>` : '';
  const namePropsGeneric = hasGeneric ? `${nameProps}<${genericKeys?.join(',')}>` : nameProps;
  const componentOptions = hasComponentOptions ? `Controller${nameCapitalize}.$componentOptions` : '';
  // controller
  contentImports.push("import { defineComponent } from 'vue'");
  contentImports.push("import { prepareComponentOptions, useController } from 'zova';");
  contentImports.push(
    `import { ${className} } from '../../component/${name}/controller${controllerExtJs}';`,
  );
  if (hasProps) {
    contentImports.push(
      `import type { ${nameProps} } from '../../component/${name}/controller${controllerExtJs}';`,
    );
  }
  // render
  if (importRender) {
    contentImports.push(importRender);
  }
  // style
  if (importStyle) {
    contentImports.push(importStyle);
  }
  // combine
  const contentRecords2: string[] = [];
  if (hasProps) {
    const namePropsGeneric = hasGeneric ? `${nameProps}<${generic}>` : nameProps;
    contentRecords2.push(`// eslint-disable-next-line
  export interface ${namePropsGeneric} {
        controllerRef?: (ref: ${className}) => void;
      }
      `);
  }
  const _contentRecords_parts: string[] = [];
  if (hasProps) {
    contentImports.push('import type { RequiredSome } from \'zova\';');
    _contentRecords_parts.push(`// @ts-ignore ignore\n    $props: RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>;`);
  }
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
  const contentCombine = contentRecords2.length > 0
    ? `
declare module 'zova-module-${moduleName}' {
  ${contentRecords2.join('\n')} 
}
`
    : '';
  // content
  const content = `${contentImports.join('\n')}
${contentCombine}
export const Z${nameCapitalize} = defineComponent(
  ${functionGeneric}(_props: ${namePropsGeneric}) => {
    useController(Controller${nameCapitalize}, ${importRender ? `Render${nameCapitalize}` : undefined}, ${importStyle ? `Style${nameCapitalize}` : undefined});
    return () => {};
  },
  prepareComponentOptions(${componentOptions}),
);
`;
  return content;
}
