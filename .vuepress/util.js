const fs = require('fs');
const path = require('path');

const getFile = (prefixPath) => {
  const fullPath = path.join(process.cwd(), prefixPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory ${fullPath} does not exist.`);
    return [];
  }
  return fs
    .readdirSync(fullPath)
    .map((item) => `${prefixPath}/${item.replace('.md', '')}`);
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
