const path = require('path');
const transform = require('@babel/core').transformSync;
const loaderUtils = require('loader-utils');
const getRoutePathList = require('./lib/getRoutePathList');
const genRoute = require('./lib/genRoute');
const importReducer = require('./lib/importReducer');
const importSaga = require('./lib/importSaga');
const babelEnhancePlugin = require('./lib/babel-plugin-enhance');
const routerId = '__react_router__';
const reducerId = '__redux_reducer__';
const sagaId = '__redux_saga__';

module.exports = function reactRouterLoader(codeStr) {
  const ctx = this;
  debugger
  const loaderQuery = loaderUtils.getOptions(this) || {};
  const {
    componentDir, loadablePath,
    typeName,
    integrateName,
  } = loaderQuery;
  const cwd = path.join(process.cwd(), 'src', componentDir);
  let result = codeStr;
  const routePathList = getRoutePathList(cwd, typeName, integrateName);

  // 自动生成route
  if (codeStr.indexOf(routerId) > 0) {
    const [imp, routes] = genRoute(routePathList, loadablePath);
    result = imp + codeStr;
    result = result.replace(routerId, routes);
  }
  // 自动导入reducer
  if (codeStr.indexOf(reducerId) > 0) {
    const [importList, reducers] = importReducer(routePathList);
    result = importList + codeStr;
    result = result.replace(reducerId, reducers);
  }
  // 自动导入saga
  if (codeStr.indexOf(sagaId) > 0) {
    const [importList, sagas] = importSaga(routePathList);
    result = importList + codeStr;
    result = result.replace(sagaId, sagas);
  }

  // integrate.js
  if (ctx.resourcePath.endsWith('/integrate.js')) {
    const namespace = path.relative(cwd, path.dirname(ctx.resourcePath));
    const { code } = transform(codeStr, {
      plugins: [[babelEnhancePlugin, { namespace, enhancePath: '../../../../lib/enhance.js' }]]
    })
    result = code;
  }
  ctx.addContextDependency(componentDir);
  ctx.cacheable();
  return result;
}