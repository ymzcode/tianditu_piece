/*
 * 实现echarts自定义覆盖物
 * */
import * as echarts from "echarts";
import "echarts-gl";

const echartsMapOverlay = window.T.Overlay.extend({
  initialize: function (lnglat, options) {
    // 放置的位置
    this.lnglat = lnglat;
    // 配置项
    this.options = options || {};
    this.setOptions(options);
    // echarts 配置项
    this.echartsOptions = options.echartsOptions || {};
    // 容器长
    this.width = options.width || 200;
    // 容器高
    this.height = options.height || 200;
    // index层级
    this.index = options.index;
    // 地图中echarts node节点
    this._div = null;
    // 创建完成后的chart视图
    this.chartView = null;
    // 比例系数 默认为1
    this.scaleNum = 1 || this.options.scaleNum;
    // 是否禁用自动缩放
    this.isDisScale = options.isDisScale;
    // update的回调函数
    this.updateCallBack = options.updateCallBack;
    this.map = null;
  },
  /*
   * 向地图上添加叠加物。当调用map.addOverLay时，API将调用此方法。自定义叠加物时需要实现此方法。自定义叠加物时需要将覆盖物对应的HTML元素返回。
   * */
  onAdd: function (map) {
    this.map = map;
    const div = (this._div = document.createElement("div"));
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.index = this.index;

    // let that = this;

    // div.onmouseover = function () {
    //   that.map.disableDrag();
    //   that.map.disableScrollWheelZoom();
    //   that.map.disableDoubleClickZoom();
    // };
    //
    // div.onmouseout = function () {
    //   that.map.enableDrag();
    //   that.map.enableScrollWheelZoom();
    //   that.map.enableDoubleClickZoom();
    // };

    map.getPanes().overlayPane.appendChild(this._div);
    this.update(this.lnglat);
    return this._div;
  },
  /*
   * 初始化echarts
   * */
  initEcharts() {
    if (!this.chartView) {
      // 基于准备好的dom，初始化echarts实例
      this.chartView = echarts.init(this._div);
    }
    const myChart = this.chartView;
    // 绘制图表
    myChart.setOption(this.echartsOptions);
  },
  bindEvent() {},
  unbindEvent() {},
  /*
   * 获取初始化完成后的charts
   * */
  getChart() {
    return this.chartView;
  },
  updateOption() {},
  /*
   * 刷新数据&配置项
   * echarts的option
   * */
  refreshEchartsOption(option) {
    const _option = Object.assign(this.options, option);
    this.chartView.setOption(_option);
  },
  onRemove: function () {
    var parent = this._div.parentNode;
    if (parent) {
      parent.removeChild(this._div);
      this.map = null;
      this._div = null;
      this.chartView = null;
    }
  },
  /**
   * 更新位置
   */
  update: function () {
    const pos = this.map.lngLatToLayerPoint(this.lnglat);
    // 获取当前放大缩小的级别
    const zoom = this.map.getZoom();
    // 根据比例系数设置放大缩小时图表的宽高
    // 缩放级别为1-18 ， 默认10为原始宽高，其他级别根据计算进行变更宽高
    const _width = this.isDisScale
      ? this.width
      : (zoom / 10) * this.width * this.scaleNum;
    const _height = this.isDisScale
      ? this.height
      : (zoom / 10) * this.height * this.scaleNum;

    this._div.style.top = pos.y - _height / 2 + "px";
    this._div.style.left = pos.x - _width / 2 + "px";

    this._div.style.width = _width + "px";
    this._div.style.height = _height + "px";
    this.chartView &&
      this.chartView.resize({
        width: _width,
        height: _height,
      });
    // console.log(this.updateCallBack);
    // console.log(this._div.style.width);
    this.initEcharts();

    const map = this.map;
    const chartView = this.chartView;
    if (typeof this.updateCallBack == "function") {
      this.updateCallBack.call(this, chartView, map);
    }
  },
});

const echartsOverlay = echartsMapOverlay;

export { echartsOverlay };
export default echartsMapOverlay;
