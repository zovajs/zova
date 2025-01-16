import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { getTag } from './utils.js';

// interface ComponentFindInfo {
//   import: ImportInfo;
//   component: ComponentInfo;
// }

interface ContextInfo {
  behaviors: boolean;
}

export default function () {
  const visitor: Visitor<PluginPass> = {
    Program(path: NodePath<t.Program>, state) {
      // context
      const context: ContextInfo = {
        behaviors: false,
      };
      // traverse
      path.traverse(createVisitor(context), state);
      if (context.behaviors) {
        // insertImport
        insertImport(path);
      }
    },
  };
  return { visitor };
}

function createVisitor(context: ContextInfo) {
  return {
    JSXElement(path: NodePath<t.JSXElement>, state: PluginPass) {
      const nodePath = path.get('openingElement');
      const { tag } = buildProps(path, state);
      const behaviorExpressions = t.arrayExpression();
      for (let index = nodePath.node.attributes.length - 1; index >= 0; index--) {
        const attr = nodePath.node.attributes[index];
        if (!t.isJSXAttribute(attr)) continue;
        const propName = attr.name.name;
        if (propName === 'behaviors') {
          const expression = (<t.JSXExpressionContainer>attr.value)?.expression;
          if (t.isObjectExpression(expression)) {
            behaviorExpressions.elements.push(expression);
          } else if (t.isArrayExpression(expression)) {
            behaviorExpressions.elements.push(...expression.elements);
          }
          nodePath.node.attributes.splice(index, 1);
        }
      }
      if (behaviorExpressions.elements.length > 0) {
        nodePath.node.attributes.push(
          t.jsxAttribute(t.jsxIdentifier('behaviors'), t.jsxExpressionContainer(behaviorExpressions)),
        );
        // path.get('openingElement').node.name.name
        if (t.isJSXIdentifier(nodePath.node.name)) {
          context.behaviors = true;
          nodePath.node.name.name = 'ZBehavior__';
          const props = [t.objectProperty(t.identifier('component'), tag)];
          if (t.isStringLiteral(tag)) {
            props.push(t.objectProperty(t.identifier('name'), t.stringLiteral(tag.value)));
          }
          const objectExpression = t.objectExpression(props);
          nodePath.node.attributes.push(
            t.jsxAttribute(t.jsxIdentifier('behaviorTag'), t.jsxExpressionContainer(objectExpression)),
          );
        }
      }
    },
  };
}

function insertImport(path: NodePath<t.Program>) {
  const nodeImport = t.importDeclaration(
    [t.importSpecifier(t.identifier('ZBehavior__'), t.stringLiteral('ZBehavior'))],
    t.stringLiteral('zova-module-a-behavior'),
  );
  path.get('body')[0].insertBefore(nodeImport);
}

const buildProps = (path: NodePath<t.JSXElement>, state: PluginPass) => {
  const tag = getTag(path, state);
  return {
    tag,
  };
};
