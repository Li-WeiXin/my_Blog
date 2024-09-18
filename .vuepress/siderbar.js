const { createSideBarConfig } = require('./util');
// const CSS_PATH = '/blogs/css'
const JAVASCRIPT_PATH = '/blogs/javascript';
const TYPESCRIPT_PATH = '/blogs/typescript';
const PERFORM_PATH = '/blogs/performance';
// const ALGORITHM_PATH = '/blogs/algorithm'
const GIT_PATH = '/blogs/git';
// const OTHER_PATH = '/blogs/other'

module.exports = {
  // [CSS_PATH]: [createSideBarConfig('CSS基础', CSS_PATH)],
  [JAVASCRIPT_PATH]: [createSideBarConfig('js相关', JAVASCRIPT_PATH)],
  [TYPESCRIPT_PATH]: [createSideBarConfig('ts专项', TYPESCRIPT_PATH)],
  [PERFORM_PATH]: [createSideBarConfig('前端性能相关', PERFORM_PATH)],
  // [ALGORITHM_PATH]: [createSideBarConfig('算法', ALGORITHM_PATH)],
  [GIT_PATH]: [createSideBarConfig('git', GIT_PATH)],
  // [OTHER_PATH]: [createSideBarConfig('工具', OTHER_PATH)],
};
