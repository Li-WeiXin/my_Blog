> 相关地址：
>
> Chrome插件V3文档：https://developer.chrome.com/docs/extensions/mv3/manifest/
>
> MDN文档：https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions
>
> Vue3+Vite模板（支持热更新）：https://github.com/antfu/vitesse-webext

# 一、简介

浏览器插件是一种浏览器的扩展程序，可以在浏览器中添加额外的功能和特性，以满足用户的个性化需求。用户可以在浏览器应用商店（eg: [Chrome 应用商店](https://chrome.google.com/webstore?utm_source=ext_app_menu)）自由选择并安装插件。



# 二、发展历程及现状

浏览器插件的各个版本如下：

1. V1 版本：通常指最初的浏览器扩展程序版本，主要支持基本的 API 和功能。这些扩展程序的开发方式比较简单，但功能和性能相对较弱。发布于2009年。

2. V2 版本：在 V1 版本的基础上增加了一些新的 API 和功能。发布于2012年。

3. V3 版本：在架构和功能上进行了重大改进，采用了新的 Manifest V3 规范，更加安全、稳定、快速和高效。发布于2021年。

   > Manifest V3 is available beginning with Chrome 88, and the Chrome Web Store begins accepting MV3 extensions in January 2021.

截至2021年9月，Google Chrome Web Store 中的插件数量大约为20万个左右。这些插件覆盖了各种不同的领域和用途，例如广告拦截、社交媒体、网页制作、办公工具、安全防护等。需要注意的是，用户在安装插件时需要仔细查看其权限和评价，确保其安全和可靠。



# 三、快速入门

## 重要组成部分

插件一般由以下部分组成

1. **[manifest.json](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv2%2Fgetstarted%2F)：相当于插件的 meta 信息，包含插件的名称、版本号、图标、脚本文件名称等，这个文件是每个插件都必须提供的，其他几部分都是可选的。**

2. [background script](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv2%2Fbackground_pages%2F)：可以调用全部的 chrome 插件 API，实现跨域请求、网页截屏、弹出 chrome 通知消息等功能。相当于在一个隐藏的浏览器页面内默默运行。

3. Popup & Options ：包括点击插件图标弹出的页面（简称 popup）、插件的配置页面（简称 options）。

4. [content script](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv2%2Fcontent_scripts%2F)：早期也被称为 injected script，是插件注入到页面的脚本，但是不会体现在页面 DOM 结构里。content script 可以操作 DOM，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。content script 可以调用有限的 chrome 插件 API，网络请求收到同源策略限制。



> 注意：
>
> 1. **popup 无法通过程序打开，只能由用户点击打开。点击 popup 之外的区域会导致 popup 收起。**
>
> 2. 由于 content script 受到同源策略的限制，所以一般网络请求都交给 background script 处理。
>
> 3. content script、插件功能页面、background script 之间的通信架构如下图：
>
> ![](images/Vnsyb8eNVovThxxXW3ccRTa5nIf.webp)
>
> 3. **chrome 可以打开多个浏览器窗口，而一个窗口会有多个 tab，所以插件的结构大致如下：（功能页面是每个 window 一份，但是每个 tab 都会注入 content script。）**
>
> ![](images/FqvvbeUSKowA1gxRf8fc0XvOnpg.webp)



## manifest.json的常用配置

```javascript
{
  "name": "Chrome插件名称",
  "version": "1.0", //插件自己的版本号
  "description": "Chrome插件描述",
  // Chrome Extension 版本号，推荐直接使用 3
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js" //这里的路径是相对于插件包的根目录的
  },
  "content_scripts": [
    {
      // 哪些页面地址会自动执行该脚本（可以使用字符串正则，<all_urls>表示匹配所有地址）
      "matches": ["<all_urls>"],
      // 注入到目标页面的css，注意不要污染目标页面的样式
      "css": ["content.css"],
      // 注入到目标页面js，这个js是在沙盒里运行，与目标页面是隔离的，没有污染问题。
      "js": ["content.js"],
      // 代码注入的时机，可选document_start、document_end、document_idle（默认）
      "run_at": "document_end"
    }
  ],
  // 使用某个chrome API之前，需先在这里注册
  "permissions": ["downloads", "contextMenus", "storage"],
  // 如果向目标页面插入图片等资源，需先在这里注册
  "web_accessible_resources": [
    {
      "resources": [ "/images/logo.png" ],
      "matches": ["<all_urls>"]
    }
  ],
  // popup页面配置
  "action": {
    // popup页面的路径（根目录为最终build生成的插件包目录）
    "default_popup": "index.html",
    // 浏览器插件工具栏看到的图标
    "default_icon": {
      "16": "/images/logo.png",
      "32": "/images/logo.png",
      "48": "/images/logo.png",
      "128": "/images/logo.png"
    }
  },
  // 插件管理节目看到的图标，不同尺寸的使用路径
  "icons": {
    "16": "/images/logo.png",
    "32": "/images/logo.png",
    "48": "/images/logo.png",
    "128": "/images/logo.png"
  },
  
  // 哪些域名允许使用插件
  "host_permissions": ["<all_urls>"],
}

```

## content script

1. 只能使用有限的 chrome API。且可以访问 DOM。但是 content script 是运行在隔离的空间（类似沙盒），所以如果需要和页面的其他脚本通信，需要采用 `window.postMessage` 的方式和页面进行通信。

2. 注入方式

   1. 声明式注入

      举例如下：

      ```json
      {
          "content_scripts": [
              {
                  "matches": [ "http://*/*", "https://*/*" ],
                  "run_at": "document_idle",
                  "js": [  "content.js" ]
              }
          ]
      }
      ```

      注意：如果用户已经打开了 N 个页面，然后再安装插件，这 N 个页面除非重新刷新，否则是不会加载 manifest 声明的 content\_scripts。安装插件之后新打开的页面是可以加载 content\_scripts 的。

   2. 编程式注入

      ```javascript
      // content.js
      // 监听插件图标点击事件
      chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.executeScript({    file: 'content.js',  });
      });
      ```

   注意：采用该方式，用户每次点击插件图标时，content.js 的内容都会被执行，可能会引起错误。

   > **综上所述：声明式只会注入一次，缺点是可能需要刷新页面。程序式不需要刷新页面，缺点是可能会注入多次。**



## background script

1. 一个插件可以有一个或者多个后台脚本文件。

2. 后台脚本放置的是需要长期保持状态，或者需要执行长期的操作，并且与任意特定网页或者浏览器窗口的生命周期无关的代码。

3. 后台脚本会在扩展程序被加载后立即被加载，并且一直保持被加载状态，只有在扩展程序被禁止或者卸载的时候才停止运行。只要你获得了必要的许可permissions，你可以在该脚本中使用任意的扩展程序 API

4. 可以理解它是在一个隐藏的 tab 中执行，所在的页面域名为空，这会影响对 document.cookie 的使用。

   > 如果你仅仅指定了“scripts”属性，将生成一个空白的页面来运行指定的脚本。

   * 比如 background 需要和 a.com 通信。首先应该把 *`https://`*`.a.com/*` 加入到 manifest 的 permissions 数组中。当发送网络请求时，浏览器会自动带上 a.com 的 cookie，服务器的 set-cookie 也会对浏览器生效。这是符合预期的。

   * 但是读取 document.cookie 时，由于 background 所在的域名为空，a.com 被认为是第三方 cookie，会读取不到。所以需要使用 [chrome.cookies](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fcookies%2F) API 来读取 cookie。



## 通信方法

1. content script 可以和 background script、popup页面、options页面，它们互相都可以进行通信，常用的通信 API 为：

   * `chrome.runtime.sendMessage`

   * `chrome.runtime.onMessage`

   * `browser.tabs.query({`[`active`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query#active)`: true}).postMessage`



   > 文档：https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/runtime
   >
   > 详细的通行方案，可参考：https://juejin.cn/post/7021072232461893639

2. popup 页面 / options 页面 可以通过 `chrome.extension.getBackgroundPage()` 获取到 background 的全局变量，但还是推荐使用 `chrome.runtime` 通信。

3. options 页面 通常是用来设置插件功能的，所以一般需要调用 `chrome.storage` 存储配置。



## 适配其他浏览器

chrome 插件适配其他浏览器的工作量是较小。当然，也可考虑使用\`webextension-polyfill\`库：https://www.npmjs.com/package/webextension-polyfill

> 但很久没更新了，可自行选择是否使用



# 四、样例

> 详见本地文件

> Vue3+Vite 项目开发模板（支持热更新）：https://github.com/antfu/vitesse-webext
>
> **注意：使用Vue-router时，插件里的页面仅支持使用hash路由**



# 五、发布

1. Chrome 发布插件需要花费 5 美元开通账号：https://developer.chrome.com/docs/webstore/register/

2. Firefox 发布教程：https://addons.mozilla.org/en-US/developers/

3. Edge 发布教程：https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/publish/create-dev-account



# 参考文档

1. https://juejin.cn/post/7114959554709815326

2. https://juejin.cn/post/7229238405406294074

3. https://juejin.cn/post/7266737898669146147?searchId=202311291844586AC180C0B0ADD81692D9#heading-15




> ***PS：本文内容均来源于网络，仅供交流学习***

