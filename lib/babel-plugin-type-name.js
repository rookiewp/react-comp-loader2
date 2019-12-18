module.exports = function actionNameAutoPlugin({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path, state) {
        const namespace = state.opts.namespace;
        const declaration = path.get('declaration');
        const declarations = declaration.get('declarations');
        declarations.forEach((item, index) => {
          const name = declarations[index].get('id').node.name;
          declarations[index].node.init = t.StringLiteral(`${namespace}/${name}`)
        });
      }
    },
  };
};
