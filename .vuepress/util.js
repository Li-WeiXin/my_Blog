const fs = require('fs');
const path = require('path');

/**
 * 
 *使用 path.resolve 替代 path.join 和 process.cwd 的组合，它可以直接解析到绝对路径。
 *使用模板字符串来创建新的路径，而不是使用字符串连接。
 */
const getFile = (prefixPath) => {
  const fullPath = path.resolve(prefixPath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs
    .readdirSync(fullPath)
    .filter((item) => path.extname(item) === '.md')  // 只处理 .md 文件
    .map((item) => `${prefixPath}/${path.basename(item, '.md')}`);
};

const createSideBarConfig = (title, prefixPath, collapsable = true) => {
  return {
    title,
    collapsable,
    children: getFile(prefixPath),
  };
};

module.exports = {
  createSideBarConfig,
};
