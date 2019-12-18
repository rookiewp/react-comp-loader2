const enhanceFuncName = 'enhance';

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path, state) {
        const { namespace, enhancePath } = state.opts;
        path.insertBefore(t.importDeclaration([t.importDefaultSpecifier(t.identifier(enhanceFuncName))], t.stringLiteral(enhancePath)));

        const objNode = path.get('declaration').node;
        const callExpression = t.CallExpression(t.identifier(enhanceFuncName), [objNode, t.stringLiteral(namespace)])
        path.get('declaration').replaceWith(callExpression);
      }
    },
  };
};
