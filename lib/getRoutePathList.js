const path = require('path');
const glob = require('glob').sync;

module.exports = function getRoutePathList(cwd, typeName, integrateName) {
  let files = glob('**/route.json', { cwd });
  if (files.length > 0) {
    files = files.filter(item => {
      const newCwd = path.dirname(path.join(cwd, item))
      const view = glob('view.jsx', { cwd: newCwd })[0];
      if (view) return true;
      return false;
    })
  }
  return files.map(item => ({
    routePath: path.dirname(item),
    jsonPath: path.join(cwd,item),
    compPath: path.join(cwd, path.dirname(item), 'view.jsx'),
    integratePath: path.join(cwd, path.dirname(item), `${integrateName}.js`),
  }));
}