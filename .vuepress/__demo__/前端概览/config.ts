/* eslint-disable vue/max-len */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

/**
 * 通用工具类，包含一些常用的工具方法。
 */
export class ConfigProviderUtils {
  /**
   * 检查item是否为对象。
   * @param {*} item - 要检查的item。
   * @returns {boolean} - 如果item是对象则为 true，否则为 false。
   */
  static isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  /**
   * 深度合并两个对象。
   * @param {Object} target - 目标对象。
   * @param {Object} source - 要合并的源对象。
   * @returns {Object} - 合并后的对象。
   */
  static mergeDeep(target, source) {
    const output = { ...target };
    if (ConfigProviderUtils.isObject(target) && ConfigProviderUtils.isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (ConfigProviderUtils.isObject(source[key])) {
          if (!(key in target)) Object.assign(output, { [key]: source[key] });
          else output[key] = ConfigProviderUtils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }
}

/**
 * 用于管理离线配置
 */
export class OfflineConfigProvider {
  /**
   * 存储离线配置的对象
   * @type {Object}
   */
  static offlineConfigs = {};

  /**
   * 初始化离线配置
   * @param {boolean} [merge] - 指示是否合并默认配置，默认为 false
   * @returns {Object|null} - 初始化后的离线配置，如果发生错误则返回null
   */
  static initOfflineConfigs(merge = false){
    let customConfigName = process.env.brand || 'default';
    // 针对配置环境变量时添加brand为nio，仍需要读取dafault.config.json
    if (customConfigName === 'nio') {
      customConfigName = 'default'
    }
    const geo = process.env.geo || 'cn';
    let configPath = '';
    try {
      configPath = customConfigName
        ? `${process.cwd()}/configs/${geo}/${customConfigName}.config.json`
        : `${process.cwd()}/configs/${geo}/default.config.json`;
      const config = require(configPath);
      if (!merge) {
        OfflineConfigProvider.offlineConfigs[geo] = config;
      } else {
        if (customConfigName) {
          const defaultConfig = require(`${process.cwd()}/configs/${geo}/default.config.json`);
          OfflineConfigProvider.offlineConfigs[geo] = ConfigProviderUtils.mergeDeep(defaultConfig, config);
        } else {
          OfflineConfigProvider.offlineConfigs[geo] = config;
        }
      }
    } catch (error) {
      console.error(`读取配置文件时发生错误：${configPath}`, error);
      return null;
    }
    OfflineConfigProvider.offlineConfigs[geo].brand = process.env.brand || 'nio';
    OfflineConfigProvider.offlineConfigs[geo].geo = geo;
    return OfflineConfigProvider.offlineConfigs[geo];
  }

  /**
   * 编辑 webpack 的 DefinePlugin 钩子
   *
   * @param {Object|null} config - 自定义配置对象或 null
   * @param {boolean} [merge] - 指示是否合并默认配置，默认为 false
   *
   * @returns {Object|null} - 返回修改后的 webpack 配置对象或 null
   *
   * 该方法会初始化离线配置，并通过 DefinePlugin 插件将这些配置注入到 `process.config` 中。
   * 具体操作包括：
   * 1. 调用 `OfflineConfigProvider.initOfflineConfigs(merge)` 初始化离线配置。
   * 2. 使用 `plugin('define').tap` 方法修改 DefinePlugin 的参数。
   * 3. 将离线配置转换为 JSON 字符串，并合并到 `process.config` 对象中。
   *
   * 注意：此方法主要用于在打包过程中动态注入环境配置，以便于前端代码访问。
   */
  static chainWebpack(config, merge: boolean) {
    const offlineConfig = OfflineConfigProvider.initOfflineConfigs(merge);
    config.plugin('define').tap((args) => {
      args[0] = {
        ...args[0],
        process: {
          ...args[0].process,
          config: Object.fromEntries(
            Object.entries(offlineConfig).map(([key, value]) => [key, JSON.stringify(value)]),
          ),
        },
      };
      return args;
    });
  }
}

/**
 * 用于管理运行时配置
 */
export class RuntimeConfigProvider {
  /**
   * 默认配置，初始化为 process.config 或一个空对象
   * @type {Object}
   */
  static configs: Object = process.config || {};

  /**
   * 用于跟踪每个命名空间的注册操作的 Promise 对象
   * @type {Object}
   */
  static registrationPromise = {};

  /**
   * 异步注册配置命名空间，使用提供的 reducer 函数
   * @param {Function} reducer - 用于获取配置的 reducer 函数
   * @param {string} namespace - 配置的命名空间
   * @returns {Promise} - 一个解析为注册配置的 Promise
   */
  static async register(reducer: () => any, namespace?: string) {
    if (namespace) {
      // 如果存在注册 Promise，则等待其完成
      if (this.registrationPromise[namespace]) {
        await this.registrationPromise[namespace];
      }

      // 开始注册配置
      this.registrationPromise[namespace] = (async () => {
        const config = await reducer();
        RuntimeConfigProvider.configs[namespace] = config;
      })();

      // 等待注册完成
      await this.registrationPromise[namespace];

      // 返回注册的配置
      return RuntimeConfigProvider.configs[namespace];
    }
    // 如果没传namespace, 直接合并配置
    const config = await reducer();
    Object.assign(RuntimeConfigProvider.configs, ConfigProviderUtils.mergeDeep(process.config, config))
    // 返回注册的配置
    return RuntimeConfigProvider.configs;
  }

  // static addGeoBrandToRequest(apiMethod = 'axios') {
  //   // 添加请求拦截器
  //   if (apiMethod === 'axios') {
  //     axios.interceptors.request.use(
  //       (config) => {
  //         // 在发送请求之前添加默认参数
  //         const brand = (process.config as any).brand;
  //         const geo = (process.config as any).geo;
  //         const defaultParams = {
  //           brand: brand || 'nio',
  //           biz_area: geo
  //         };
  //         config.params = { ...config.params, ...defaultParams };

  //         // 添加默认的请求头
  //         config.headers['Default-Header'] = 'DefaultValue';

  //         return config;
  //       },
  //     );
  //   } else {
  //     const originalFetch = window.fetch;
  //     window.fetch = function (url: any, options = {}) {
  //       const brand = (process.config as any).brand;
  //       const geo = (process.config as any).geo;
  //       const defaultParams = {
  //         brand: brand || 'nio',
  //         biz_area: geo
  //       };
  //       // 将默认参数添加到 URL 中
  //       const urlObj = new URL(url, window.location.origin);
  //       Object.keys(defaultParams).forEach((key) => urlObj.searchParams.append(key, defaultParams[key]));

  //       return originalFetch(urlObj.toString(), options);
  //     };
  //   }
  // }

  static applyConfigToBody() {
    const brand = (process.config as any).brand;
    const geo = (process.config as any).geo;
    document.body.classList.add(`config-brand-${brand}`);
    document.body.classList.add(`config-brand-${geo}`);
  }

  /**
   * 异步获取指定命名空间的配置
   * 如果未提供命名空间，则返回整个 configs 对象的 Promise
   * @param {string} [namespace] - 配置的命名空间
   * @returns {Promise} - 请求的配置的Promise 或整个 configs 对象的 Promise
   */
  static async getConfigAsync(namespace?: string) {
    if (namespace === undefined) {
      // 如果未提供命名空间，则返回一个解析为整个 configs 对象的 Promise
      return Promise.resolve(RuntimeConfigProvider.configs);
    }

    const config = RuntimeConfigProvider.configs[namespace];
    if (config !== undefined) {
      console.log(`同步获取 ${namespace} 的配置：`, config);
      return config;
    } if (this.registrationPromise[namespace]) {
      // 如果注册 Promise 存在，则等待其完成
      await this.registrationPromise[namespace];
      console.log(`注册 ${namespace} 配置已完成`);
      return Promise.resolve(RuntimeConfigProvider.configs[namespace]);
    }
    console.warn(`同步获取 ${namespace} 配置失败：未找到配置`);
    return undefined;
  }
}

// module.exports = {
//   OfflineConfigProvider,
//   RuntimeConfigProvider,
//   ConfigProviderUtils,
// };
