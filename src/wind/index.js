/*
* 该风场文件已发布npm插件，tmap-wind，地址：https://github.com/ymzcode/tmap-wind
* */

import {
  WindCore,
  isArray,
  formatData,
  defaultOptions,
  assign,
} from "wind-core";

// 检查当前环境是否已经引入天地图
if (!window.T) {
  throw new Error("没有引入天地图js");
}

const TMapWind = window.T.Overlay.extend({
  // 构造函数时传递参数，对OverlayOptions属性值进行赋值。
  initialize: function (data, options = {}) {
    const opt = assign({}, options);
    this.map = null;
    this.options = opt;
    this.paneName = "overlayPane";
    this.context = "2d";
    this.zIndex = this.options.zIndex;
    this.mixBlendMode = "normal";
    this.field = null;
    // 是否禁用默认配置项，禁用后需要自行设置
    this.isDisableAutoConfig = opt.isDisableAutoConfig;
    // 自定义的canvas样式
    this.customStyle = opt.customStyle;

    // 矢量图层
    this.canvas = null;
    this.wind = null;

    // 注册函数
    this.adjustSize = () => {
      const size = this.map.getSize();
      const canvas = this.canvas;
      const devicePixelRatio = window.devicePixelRatio || 1;

      if (canvas !== null) {
        canvas.width = size.x * devicePixelRatio;
        canvas.height = size.y * devicePixelRatio;
        if (this.context === "2d") {
          canvas
            .getContext(this.context)
            .scale(devicePixelRatio, devicePixelRatio);
        }
        canvas.style.width = size.x + "px";
        canvas.style.height = size.y + "px";
      }
    };

    this._draw = () => {
      const map = this.map;
      const size = map.getSize();
      const center = map.getCenter();
      if (center && this.canvas) {
        const pixel = map.lngLatToLayerPoint(center);
        this.canvas.style.left = pixel.x - size.x / 2 + "px";
        this.canvas.style.top = pixel.y - size.y / 2 + "px";
        this._render(this.canvas);
      }
    };

    this.getContext = () => {
      if (this.canvas === null) return;
      return this.canvas.getContext(this.context);
    };

    this.pickWindOptions = () => {
      Object.keys(defaultOptions).forEach((key) => {
        if (key in this.options) {
          if (this.options.windOptions === undefined) {
            this.options.windOptions = {};
          }
          // @ts-ignore
          this.options.windOptions[key] = this.options[key];
        }
      });
    };

    this.startAndDraw = () => {
      this.start();
      this._draw();
    };

    this.updateParams = (options) => {
      this.setWindOptions(options);
      return this;
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.pickWindOptions();

    // console.log("设置项目", this.options);

    if (data) {
      this.setData(data, options.fieldOptions);
    }
  },
  onAdd: function (map) {
    this.map = map;
    const canvas = (this.canvas = document.createElement("canvas"));
    canvas.setAttribute("id", "_TmapWind");
    canvas.style.cssText =
      this.customStyle ||
      `position:absolute; left:0; top:0; z-index: ${this.zIndex} ;user-select:none;`;
    canvas.style.mixBlendMode = this.mixBlendMode;
    this.adjustSize();
    map.getPanes()[this.paneName].appendChild(canvas);
    this.bindEvent();
    this._draw();
    return this.canvas;
  },

  _render: function (canvas) {
    if (!this.getData() || !this.map) return this;
    const opt = this.isDisableAutoConfig
      ? this.getWindOptions()
      : this.getOptimizeWindOptions();

    if (canvas && !this.wind) {
      const data = this.getData();
      const ctx = this.getContext();

      if (ctx) {
        this.wind = new WindCore(ctx, opt, data);

        this.wind.project = this.project.bind(this);
        this.wind.unproject = this.unproject.bind(this);
        this.wind.intersectsCoordinate = this.intersectsCoordinate.bind(this);
        this.wind.postrender = () => {
          // @ts-ignore
          // this.setCanvasUpdated();
        };
      }
    }

    if (this.wind) {
      this.wind.setOptions(this.options.windOptions);
      this.wind.prerender();
      this.wind.render();
    }

    return this;
  },
  setWindOptions: function (options) {
    const beforeOptions = this.options.windOptions || {};
    this.options = assign(this.options, {
      windOptions: assign(beforeOptions, options || {}),
    });

    if (this.wind) {
      this.wind.setOptions(this.options.windOptions);
      this.wind.prerender();
    }
  },
  bindEvent: function () {
    this.map.addEventListener("resize", this.handleResize);

    this.map.addEventListener("movestart", this.stop);
    this.map.addEventListener("moveend", this.startAndDraw);

    this.map.addEventListener("zoomstart", this.stop);
    this.map.addEventListener("zoomend", this.start);
  },

  unbindEvent: function () {
    this.map.removeEventListener("resize", this.handleResize);

    this.map.removeEventListener("movestart", this.stop);
    this.map.removeEventListener("moveend", this.startAndDraw);

    this.map.removeEventListener("zoomstart", this.stop);
    this.map.removeEventListener("zoomend", this.start);
  },

  // 获取优化过后的配置项
  // 插件内置配置项
  getOptimizeWindOptions: function () {
    const velocityScales = {
      0: 1 / 20,
      1: 1 / 20,
      2: 1 / 20,
      3: 1 / 30,
      4: 1 / 40,
      5: 1 / 50,
      6: 1 / 60,
      7: 0.003,
      8: 0.002,
      9: 0.001,
      10: 0.0005,
      11: 0.0003,
      12: 0.00015,
      13: 0.0001,
      14: 0.00005,
      15: 0.000025,
      16: 0.00001,
      17: 0.000005,
      18: 0.000002,
    };

    const colorScale = [
      "rgb(36,104, 180)",
      "rgb(60,157, 194)",
      "rgb(128,205,193 )",
      "rgb(151,218,168 )",
      "rgb(198,231,181)",
      "rgb(238,247,217)",
      "rgb(255,238,159)",
      "rgb(252,217,125)",
      "rgb(255,182,100)",
      "rgb(252,150,75)",
      "rgb(250,112,52)",
      "rgb(245,64,32)",
      "rgb(237,45,28)",
      "rgb(220,24,32)",
      "rgb(180,0,35)",
    ];

    const beforeOptions = this.options.windOptions || {};

    const zoom = this.map.getZoom();
    const options = {
      velocityScale: velocityScales[zoom] || 1 / 200,
      paths: zoom >= 8 ? 3000 : 5000,
      frameRate: 20,
      colorScale: colorScale,
      lineWidth: 2,
    };

    this.options = assign(this.options, {
      windOptions: assign(beforeOptions, options || {}),
    });
    return this.options.windOptions || {};
  },
  getWindOptions: function () {
    return this.options.windOptions || {};
  },
  onRemove: function () {
    // console.log("执行删除");
    this.unbindEvent();
    const parent = this.canvas.parentNode;
    parent.removeChild(this.canvas);
  },
  start: function () {
    if (this.wind) {
      // console.log("start");
      this.wind.start();
    }
  },
  stop: function () {
    if (this.wind) {
      // console.log("stop");
      this.wind.stop();
    }
  },
  getElement: function () {
    return this.canvas;
  },
  handleResize: function () {
    // console.log("可视区域变化");
    this.adjustSize();
    this._draw();
  },
  setData: function (data, options = {}) {
    if (data && data.checkFields && data.checkFields()) {
      this.field = data;
    } else if (isArray(data)) {
      this.field = formatData(data, options);
    } else {
      console.error("Illegal data");
    }

    // console.log("查看数据是否赋值", this.field);

    // 第一次不会走这里
    if (this.map && this.canvas && this.field) {
      this?.wind?.updateData(this.field);
      this._render(this.canvas);
    }

    return this;
  },
  getData: function () {
    return this.field;
  },
  project: function (coordinate) {
    // console.log('project ', coordinate)
    const pixel = this.map.lngLatToContainerPoint(
      new window.T.LngLat(coordinate[0], coordinate[1])
    );
    // const mercatorCoordinates = this.transferToMercator(coordinate);
    // console.log(pixel)
    return [pixel.x, pixel.y];
  },
  unproject: function (pixel) {
    // console.log('unproject', pixel)
    const coords = this.map.containerPointToLngLat(
      new window.T.Point(pixel[0], pixel[1])
    );
    // console.log(coords)
    return [coords.lng, coords.lat];
  },
  intersectsCoordinate: function (coordinate) {
    // console.log('intersectsCoordinate', coordinate)
    const mapExtent = this.map.getBounds();
    const bool = mapExtent.contains(
      new window.T.LngLat(coordinate[0], coordinate[1])
    );
    // console.log(bool)
    return bool;
  },
  /**
   * 更新位置
   */
  update: function () {
    // console.log("重新绘制");
    this._draw();
  },
});

const WindLayer = TMapWind;

export { WindLayer };

export default TMapWind;
