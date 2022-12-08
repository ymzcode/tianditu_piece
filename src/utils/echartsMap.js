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
    // 基于准备好的dom，初始化echarts实例
    const myChart = (this.chartView = echarts.init(this._div));
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
  /*
   * 刷新数据&配置项
   * */
  refreshOption(option) {
    const _option = Object.assign(this.options, option);
    this.chartView.setOption(_option);
  },
  onRemove: function () {
    var parent = this._div.parentNode;
    if (parent) {
      parent.removeChild(this._div);
      this.map = null;
      this._div = null;
    }
  },
  /**
   * 更新位置
   */
  update: function () {
    var pos = this.map.lngLatToLayerPoint(this.lnglat);
    this._div.style.top = pos.y - this.height / 2 + "px";
    this._div.style.left = pos.x - this.width / 2 + "px";
    this.initEcharts();
  },
});

const echartsOverlay = echartsMapOverlay;

export { echartsOverlay };
export default echartsMapOverlay;
