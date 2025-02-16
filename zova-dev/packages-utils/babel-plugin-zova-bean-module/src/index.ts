import type { PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { /* template, */ types as t } from '@babel/core';
import { parseInfoFromPath } from '@cabloy/module-info';

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
    [t.importSpecifier(t.identifier('__z_BeanInfo'), t.stringLiteral('BeanInfo'))],
    t.stringLiteral('zova'),
  );
  path.get('body')[0].insertBefore(nodeImport);
}

function __parseBeanInfo(state) {
  const sourceFileName = state.file.opts.sourceFileName || state.file.opts.filename || '';
  const moduleName = __getModuleName(sourceFileName);
  if (!moduleName) return;
  return { module: moduleName };
}

function __getModuleName(sourceFileName: string | null | undefined) {
  if (!__checkIfValid(sourceFileName)) return;
  const moduleInfo = parseInfoFromPath(sourceFileName);
  if (!moduleInfo) return;
  return moduleInfo.relativeName;
}

function __createDecoratorNode(beanInfo) {
  const propertyNodeModule = t.objectProperty(t.identifier('module'), t.stringLiteral(beanInfo.module));
  const objectExpression = t.objectExpression([propertyNodeModule]);
  const callExpression = t.callExpression(t.identifier('__z_BeanInfo'), [objectExpression]);
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
    return fileName.includes(item);
  });
}
