module.exports = (routePathList) => {
  let importList = '';
  let reducers = '';

  routePathList.forEach((item, index) => {
    let { routePath, integratePath } = item;
    importList += `import store${index + 1} from '${integratePath}'\n`;
    reducers += `${routePath}: store${index + 1}.reducer, \n`;
  })
  return [importList, `{\n ${reducers}}`]
}