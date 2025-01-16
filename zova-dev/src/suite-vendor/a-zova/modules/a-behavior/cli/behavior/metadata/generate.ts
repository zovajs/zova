import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { moduleName, globFiles } = options;
  if (globFiles.length === 0) return '';
  const contentRecords: string[] = [];
  for (const { beanName, isIgnore } of globFiles) {
    if (isIgnore) continue;
    const behaviorAttrName = _combineBehaviorAttrName(moduleName, beanName);
    const beanNameCapitalize = toUpperCaseFirstChar(beanName);
    contentRecords.push(`'${behaviorAttrName}'?: IBehaviorOptions${beanNameCapitalize} | '' | true;`);
  }
  // combine
  const content = `/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    ${contentRecords.join('\n')}
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      ${contentRecords.join('\n')}
    }
  }
}
/** behaviors: end */
`;
  return content;
}

// bs-providerId-moduleName-beanName
function _combineBehaviorAttrName(moduleName: string, beanName: string) {
  const parts = ['bs'];
  if (!moduleName.startsWith('a-')) {
    parts.push(moduleName);
  } else {
    const moduleNameShort = moduleName.substring('a-'.length);
    if (!beanName.startsWith(moduleNameShort)) {
      parts.push(moduleNameShort);
    }
  }
  parts.push(beanName);
  return parts.join('-');
}
