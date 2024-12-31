import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { parseInfoFromPath } from '@cabloy/module-info';
import { hashCode } from '@cabloy/word-utils';

interface ContextInfo {
  needBeanInfo: boolean;
}

export default function () {
  const visitor: Visitor<PluginPass> = {
    Program(path: NodePath<t.Program>, state) {
      const beanInfo = __parseBeanInfo(state);
      if (!beanInfo) return;
      // context
      const context: ContextInfo = {
        needBeanInfo: false,
      };
      // traverse
      path.traverse(createVisitor(context, beanInfo));
      // insertImport
      if (context.needBeanInfo) {
        insertImport(path);
      }
    },
  };
  return { visitor };
}

function createVisitor(context: ContextInfo, beanInfo) {
  return {
    ClassDeclaration(path: NodePath<t.ClassDeclaration>) {
      const decorators = path.node.decorators;
      if (!decorators || decorators.length === 0) return;
      const decoratorNode = __createDecoratorNode(beanInfo);
      decorators.push(decoratorNode);
      context.needBeanInfo = true;
    },
  };
}

function insertImport(path: NodePath<t.Program>) {
  const nodeImport = t.importDeclaration(
    [t.importSpecifier(t.identifier('BeanInfo'), t.stringLiteral('BeanInfo'))],
    t.stringLiteral('zova'),
  );
  path.get('body')[0].insertBefore(nodeImport);
}

function __parseBeanInfo(state) {
  const sourceFileName = state.file.opts.sourceFileName || state.file.opts.filename || '';
  const moduleName = __getModuleName(sourceFileName);
  if (!moduleName) return;
  const pattern = `${moduleName}/src/`;
  let fileName = sourceFileName.substring(sourceFileName.indexOf(pattern) + pattern.length);
  fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  const hash = hashCode(fileName);
  return { module: moduleName, hash };
}

function __getModuleName(sourceFileName: string | null | undefined) {
  if (!__checkIfValid(sourceFileName)) return;
  const moduleInfo = parseInfoFromPath(sourceFileName);
  if (!moduleInfo) return;
  return moduleInfo.relativeName;
}

function __createDecoratorNode(beanInfo) {
  const propertyNodeModule = t.objectProperty(t.identifier('module'), t.stringLiteral(beanInfo.module));
  const propertyNodeHash = t.objectProperty(t.identifier('hash'), t.stringLiteral(beanInfo.hash));
  const objectExpression = t.objectExpression([propertyNodeModule, propertyNodeHash]);
  const callExpression = t.callExpression(t.identifier('BeanInfo'), [objectExpression]);
  const decoratorNode = t.decorator(callExpression);
  return decoratorNode;
}

// function __applyDecorator(expression: t.CallExpression, moduleName: string) {
//   const propertyNode = t.objectProperty(t.identifier('module'), t.stringLiteral(moduleName));
//   const args = expression.arguments;
//   if (args.length === 0) {
//     const objectExpression = t.objectExpression([propertyNode]);
//     args.push(objectExpression);
//   } else {
//     const objectExpression = args[0] as t.ObjectExpression;
//     objectExpression.properties.push(propertyNode);
//   }
// }

function __checkIfValid(fileName?: string | null) {
  if (!fileName) return false;
  return !['src/boot/app/', '.zova/app/'].some(item => {
    return fileName.indexOf(item) > -1;
  });
}
