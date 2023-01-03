# 介绍

tianditu_piece是一个以天地图JavaScript API 4.0为基础，整合地图应用中常见的功能，并探索&创造地图应用更多可能性的项目。

关于天地图JavaScript API 4.0的更多介绍可以查看: [天地图官网](http://lbs.tianditu.gov.cn/api/js4.0/guide.html)

# 安装&运行

```
npm install
npm run dev
```

# 注意

1. 因为项目资源配额有限（每天1W），所以做了token、地图类型的随机分发，如果当前地图无法正常查看，请尝试重新刷新页面
2. 项目处于开发阶段，各方法存在变动情况，详见更新日志
3. 自1.1.7开始，更新开发内容在dev分支，main主分支将随版本进行更新

# 功能
- [x] 天地图的基础框架，包含全局视图管理中心（stores/tianditu.js）
- [x] 模拟线上、线下展示最多20万海量数据（全国幼儿园数据）的加载效果
- [x] 实现天地图的风场可视化/风向图效果，封装插件[tmap-wind](https://github.com/ymzcode/tmap-wind)
- [x] 在线调试和风天气中城市搜索、分钟预报、天气指数、空气质量等在天地图的应用效果
- [x] 在地图图层中展示Echarts（包含3D）等绝大部分图表（[tmap-echarts](https://github.com/ymzcode/tmap-echarts)）
- [x] 【**实验功能**】通过和chatGpt对话，可以调用地图中的方法
- [x] 添加艾尔登法环地图瓦片
- [ ] 其他功能思考🤔&开发👾中···

# 各依赖项

- [tailwindcss](https://tailwindcss.com/docs/installation/framework-guides)
- [NaiveUi](https://www.naiveui.com/zh-CN/os-theme)
- [Pinia](https://pinia.web3doc.top/introduction.html) (必要依赖)
- [dayjs](https://github.com/iamkun/dayjs) 
- [echarts](https://www.npmjs.com/package/echarts)
- [echarts-gl](https://www.npmjs.com/package/echarts-gl)

# 更新日志

https://github.com/ymzcode/tianditu_piece/blob/main/CHANGELOG.md

# 测试环境

游览器：Chrome 107.0.5304.87 +

开发机器：Apple M1 Max【13.0.1 (22A400)】

IDEA：WebStorm 2022.3 +

Node：v18.12.1

Npm：8.19.2

- 该环境为自测环境，如在其他环境有问题欢迎提issues

# 演示地址

https://ymzcode.github.io/tianditu_piece/

# 其他

博客：https://bingyishow.top

# 赞助

赞助名单：https://bingyishow.top/11.html
