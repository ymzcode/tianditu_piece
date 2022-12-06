# 介绍

tianditu_piece是一个整合了天地图JavaScript API 4.0各种功能的项目，目前来说还算不上框架。目前更多的是演示功能的可行性，但会以此为目标逐步改进。

关于天地图JavaScript API 4.0的更多介绍可以查看: [天地图官网](http://lbs.tianditu.gov.cn/api/js4.0/guide.html)

项目开发环境为node18.12.1，选用tailwind、NaiveUi作为UI库，使用Pinia作为存储库。

# 注意

1. 因为项目资源配额有限（每天1W），所以做了token、地图类型的随机分发，如果当前地图无法正常查看，请尝试重新刷新页面

# 特色
1. 可分成线上、线下模拟展示最多20万幼儿园数据的加载效果
2. 封装风场插件tmap-wind（详见：https://github.com/ymzcode/tmap-wind ），
实现了天地图的风场可视化/风向图效果
3. 正在开发中···

# 各依赖项

- [tailwind](https://tailwindcss.com/docs/installation/framework-guides)
- [NaiveUi](https://www.naiveui.com/zh-CN/os-theme)
- [Pinia](https://pinia.web3doc.top/introduction.html)


# 演示地址

https://ymzcode.github.io/tianditu_piece/

# 其他

博客：https://bingyishow.top

# 赞助

赞助名单：https://bingyishow.top/11.html
