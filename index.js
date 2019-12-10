const path = require('path');
const glob = require('glob').sync;
const loaderUtils = require('loader-utils');
const getRoutePathList = require('./lib/getRoutePathList');
const genRoute = require('./lib/genRoute');
const Identification = '__react-router__';

module.exports = function reactRouterLoader(codeStr) {
  const loaderQuery = loaderUtils.getOptions(this) || {};
  const { componentDir = 'components' } = loaderQuery;
  const cwd = path.join(process.cwd(), 'src', componentDir);
  if (codeStr.indexOf(Identification) > 0) {
    const routePathList = getRoutePathList(cwd);
    const [imp, routes] = genRoute(routePathList);
    let result = imp + codeStr;
    result = result.replace(Identification, routes);
    return result;
  }
  return codeStr;
}