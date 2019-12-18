module.exports = (routePathList) => {
  let sagas = '';
  let importList = '';
  let comma = ',';

  routePathList.forEach((item, index) => {
    let { integratePath } = item;
    if (index === routePathList.length - 1) comma = '';
    importList += `import store${index + 1} from '${integratePath}'\n`;
    const saga = `store${index + 1}.saga`;
    sagas += `${saga}${comma}`;
  })
  return [importList, `[${sagas}]`]
}