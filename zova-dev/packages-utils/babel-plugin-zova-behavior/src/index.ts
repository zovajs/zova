import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { checkIsComponent, getTag } from './utils.js';

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
      const { tag, props, isComponent } = buildProps(path, state);
      let behaviors: boolean = false;
      for (const prop of props) {
        if (!t.isJSXAttribute(prop.node)) continue;
        const propName = prop.node.name.name;
        if (propName === 'behaviors') {
          behaviors = true;
          break;
        }
      }
      if (behaviors) {
        const nodePath = path.get('openingElement');
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
      console.log(tag, isComponent);
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
  const isComponent = checkIsComponent(path.get('openingElement'), state);
  const props = path.get('openingElement').get('attributes');
  return {
    tag,
    props,
    isComponent,
  };
};
