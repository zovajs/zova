import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { parseInfoFromPath } from '@cabloy/module-info';

export default function () {
  const visitor: Visitor<PluginPass> = {
    ClassDeclaration(path: NodePath<t.ClassDeclaration>, state) {
      const decorators = path.node.decorators;
      if (!decorators || decorators.length === 0) return;
      const sourceFileName = state.file.opts.sourceFileName || state.file.opts.filename;
      const moduleName = _getModuleName(sourceFileName);
      if (!moduleName) return;
    },
  };
  return { visitor };
}

function _getModuleName(sourceFileName: string | null | undefined) {
  if (!__checkIfValid(sourceFileName)) return;
  const moduleInfo = parseInfoFromPath(sourceFileName);
  if (!moduleInfo) return;
  return moduleInfo.relativeName;
}

function __applyDecorator(expression: t.CallExpression, moduleName: string) {
  const propertyNode = t.objectProperty(t.identifier('module'), t.stringLiteral(moduleName));
  const args = expression.arguments;
  if (args.length === 0) {
    const objectExpression = t.objectExpression([propertyNode]);
    args.push(objectExpression);
  } else {
    const objectExpression = args[0] as t.ObjectExpression;
    objectExpression.properties.push(propertyNode);
  }
}

function __checkIfValid(fileName?: string | null) {
  if (!fileName) return false;
  return !['src/boot/app/', '.zova/app/'].some(item => {
    return fileName.indexOf(item) > -1;
  });
}
