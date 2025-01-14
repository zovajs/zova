import { /*template,*/ NodePath, types as t, type PluginPass } from '@babel/core';
import htmlTags from 'html-tags';
import svgTags from 'svg-tags';

/**
 * Get tag (first attribute for h) from JSXOpeningElement
 * @param path JSXElement
 * @param state State
 * @returns Identifier | StringLiteral | MemberExpression | CallExpression
 */
export const getTag = (
  path: NodePath<t.JSXElement>,
  state: PluginPass,
): t.Identifier | t.CallExpression | t.StringLiteral | t.MemberExpression => {
  const namePath = path.get('openingElement').get('name');
  if (namePath.isJSXIdentifier()) {
    const { name } = namePath.node;
    if (!htmlTags.includes(name as htmlTags.htmlTags) && !svgTags.includes(name)) {
      return name === FRAGMENT
        ? createIdentifier(state, FRAGMENT)
        : path.scope.hasBinding(name)
          ? t.identifier(name)
          : state.opts.isCustomElement?.(name)
            ? t.stringLiteral(name)
            : t.callExpression(createIdentifier(state, 'resolveComponent'), [t.stringLiteral(name)]);
    }

    return t.stringLiteral(name);
  }

  if (namePath.isJSXMemberExpression()) {
    return transformJSXMemberExpression(namePath);
  }
  throw new Error(`getTag: ${namePath.type} is not supported`);
};
