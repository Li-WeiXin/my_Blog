---
group: 'top'
icon: 'carbon:bookmark'
---

# 前端多品牌、多地域配置支持方案

### 背景

为了支持不同品牌（如 NIO、ALPS、FY）和地域（如 CN、EU、UAE）的需求，传统的方式是复制分支代码，但这导致了维护成本高的问题。通过配置化方式，前端可以用一套代码支持多品牌，降低业务扩展的边际成本。

- **解决方案**：通过配置化注入实现同一套代码支持不同品牌。
- **关键策略**：多皮肤支持、功能模块化、模块配置化。
- **技术实现**：通过 ConfigProvider 实现打包和 Runtime 时合并配置文件，控制组件展示、资源加载、API 请求和品牌样式。

---

## 解决方案使用场景

1. **控制组件展示**
    - 示例：Alps 中不展示 `<a-component>`，在 NIO 中展示。
    ```json
    // configs/{geo}/default.config.json
    { "showAComponent": true }

    // configs/{geo}/alps.config.json
    { "showAComponent": false }
    ```
    ```html
    <template>
      <a-component v-if="showAComponent"></a-component>
    </template>
    <script>
      const showAComponent = process.config.showAComponent;
    </script>
    ```

2. **静态资源路径**
    - 示例：不同品牌的 CDN 路径
    ```json
    // configs/{geo}/default.config.json
    { "cdn": { "logo": "https://cdn-fx.nio.com/nio/logo.png" } }

    // configs/{geo}/alps.config.json
    { "cdn": { "logo": "https://cdn-fx.nio.com/alps/logo.png" } }
    ```
    ```html
    <img alt="logo" :src="logoImgUrl" />
    <script>
      const logoImgUrl = process.config.cdn.logo;
    </script>
    ```

3. **API请求品牌标识控制**
    - 示例：不同区域的 `gatewayAppId`
    ```javascript
    export const getPath = async () => {
      const env = await getEnvFun();
      return `https://gateway.${env}.nio.com/moat/${process.config.gatewayAppId}`;
    };
    ```

4. **皮肤支持**
    - 通过 ConfigProvider 将品牌映射到 `body` class 上。
    ```html
    <body class="config-brand-alps">
      <div id="app"></div>
    </body>
    ```

---

## 使用方法

### 1. 离线配置

#### 步骤一：配置文件创建
- 在项目根目录创建 `configs` 文件夹，并在子文件夹（如 `configs/cn`）中创建 `{品牌名}.config.json` 配置文件。

#### 步骤二：集成到 `vue.config.js`
- 引入并调用 `OfflineConfigProvider` 的 `chainWebpack` 方法。
    ```javascript
    const { OfflineConfigProvider } = require('@nio-wad/config-provider');
    chainWebpack: (config) => {
      OfflineConfigProvider.chainWebpack(config);
    },
    ```

#### 步骤三：设置环境变量
- 在 `package.json` 中配置环境变量，例如：
    ```json
    "serve": "NODE_ENV=development brand=alps vue-cli-service serve --mode test"
    ```

### 2. 在线配置

#### 步骤一：注册在线配置
- 使用 `RuntimeConfigProvider.register` 注册在线配置。
    ```javascript
    const fxConfig = RuntimeConfigProvider.register(async () => {
      const response = await fetch(`https://static.nio.com/xxx.json`).then(r => r.json());
      return response;
    }, 'fx');
    ```

#### 步骤二：应用配置到 `body`
- 使用 `applyConfigToBody` 注册品牌到 `body` class 上。
    ```javascript
    RuntimeConfigProvider.applyConfigToBody();
    ```

#### 步骤三：获取配置
- 通过 `RuntimeConfigProvider.getConfigAsync` 异步获取合并后的配置。
    ```javascript
    const res = await RuntimeConfigProvider.getConfigAsync();
    console.log('获取在线配置', res);
    ```


---
