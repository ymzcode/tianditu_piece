# 更新日志

项目版本变更都记录在此

## 1.1.7

已同步更新demo

### Added

- 完成天气混合展示-实时天气
- 完成天气混合展示-7日天气预报
- 完成天气混合展示-24小时天气预报
- 完成天气混合展示-分钟级降水预报
- 完成天气混合展示-天气指数预报

### Changed

- 修改天气混合展示详情组件的接参方式 location

### Fixed

- 修改弹窗不关闭的bug [commit](https://github.com/ymzcode/tianditu_piece/commit/992698eea971384d08074fe55d1f1c5afdbd182c)

## 1.1.6

未更新发布demo

### Added

- 添加和风天气key的缓存逻辑
- stores/tianditu 添加addMarkerClusterer聚合视图的创建方法
- stores/tianditu 添加removeMarkerClusterer聚合视图的移除方法
- 设置 - 和风天气 - 添加空气质量监测站
- 引入第三方dayjs，用于时间处理
- 设置 - 和风天气 - 空气质量监测站完成接口对接
- 添加updateOverLay更新覆盖物方法
- 添加searchOverLay查询覆盖物方法
- 添加天气混合展示点标注
- 添加天气混合展示点标注-弹窗展示
- 添加实时天气信息展示组件（未对接接口）

### Changed

- 补充和风天气注意事项
- 将多覆盖物_CLASS_命名改为_ARRAY_
- 更改和风天气接口apikey的获取方式

### Fixed

- 修改readme中风场插件链接404问题

## 1.1.5

### Added

- 添加和风天气api key
- 对接和风天气城市搜索接口，完成城市搜索定位并标点
- 添加防抖和节流公共函数


### Changed

- stores/tianditu 添加多个覆盖物的创建与删除

### Removed

- 移除airQuality接口

## 1.1.4

### Added

- 添加覆盖物-风向图可视化展示

### Changed

- 修改地图加载方式为随机分发，防止消耗过快

## 1.1.3

### Added

- 添加覆盖物相关设置
- 完成全国20万幼儿园数据的展示

## 1.1.2

### Added

- 添加设置 - 控件相关
- 添加全局管理对象

## 1.1.1

### Added

- 添加设置 - 地图属性控制

## 1.1.0

### Added

- 初始项目，引入天地图
