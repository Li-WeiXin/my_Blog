const sidebar = require('./siderbar.js');
module.exports = {
  "title": "李叁則的博客",
  "description": "李叁則的博客",
  "dest": "public",
  "base": "/",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/logo.jpg"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "plugins": ["@vuepress-reco/vuepress-plugin-comments", "vuepress-plugin-meting"],
  "theme": "reco",
  "themeConfig": {
    "mode": 'light',
    "subSidebar": 'auto',
    "valineConfig": {
      "appId": 'CJH2UzaT4V6LUEV0kEilXtQa-gzGzoHsz',
      "appKey": 'LAn5WMtwG5gfADCdbluNvYab',
    },
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        text: '工具',
        items: [
            { text: '在线JSON解析', link: 'https://www.json.cn/' },
            { text: '在线文本对比工具', link: 'https://www.fly63.com/tool/textdiff/' },
            { text: '常用正则', link: 'https://any86.github.io/any-rule/' },
            { text: 'logo设计', link: 'https://www.uugai.com/' },
            { text: 'PDF转换器', link: 'https://smallpdf.com/cn/pdf-converter' },
        ]
      },
      // { "text": '留言板', "link": '/blogs/views/messageBoard.html', "icon": 'reco-suggestion' },
      {
        "text": "GitHub",
        "icon": "reco-github",
        "link": "https://github.com/Li-WeiXin"
      }
    ],
    sidebar,
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "目录索引"
      },
      "tag": {
        "location": 3,
        "text": "标签索引"
      }
    },
    "friendLink": [
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      },
      {
        "title": "前端进阶之旅",
        "desc": "步履不停",
        "link": "https://interview2.poetries.top/"
      },
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "李叁則",
    "authorAvatar": "/author.png",
    "record": "首页",
    "startYear": "2022",
    "smoothScroll": true
  },
  "markdown": {
    "lineNumbers": true
  }
}
