const fs = require('fs');

module.exports = (routePathList) => {
  let result = "";
  routePathList.forEach((item, index) => {
    let { routePath, jsonPath, compPath } = item;
    let json;
    const jsonStr = fs.readFileSync(jsonPath, 'utf-8');
    if (jsonStr) {
      json = JSON.parse(jsonStr);
      const { routeParam } = json;
      if (routeParam) routePath += routeParam;
    }
    result += `<Route exact path="/${routePath}" component={ loadable({ loader: () => import("${compPath}")}) }/>\n`
  })
  return ["import loadable from '../lib/loadable';\n", result]
}