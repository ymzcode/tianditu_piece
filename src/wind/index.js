import { WindCore, isArray, formatData, defaultOptions } from "wind-core";

// 检查当前环境是否已经引入天地图
if (!window.T) {
  throw new Error("没有引入天地图js");
}

const TMapWind = window.T.Overlay.extend({
  // 构造函数时传递参数，对OverlayOptions属性值进行赋值。
  initialize: function (data, options) {
    this.options = options;
    this.paneName = "overlayPane";
    this.context = "2d";
    this.zIndex = 999999;
    this.mixBlendMode = "normal";
    this.enableMassClear = false;
    this.field = null;

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

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.pickWindOptions();

    console.log("设置项目", this.options);

    if (data) {
      this.setData(data, options.fieldOptions);
    }
  },
  onAdd: function (map) {
    this.map = map;
    const canvas = (this.canvas = document.createElement("canvas"));
    canvas.style.cssText = `position:absolute; left:0; top:0; z-index: ${this.zIndex} ;user-select:none;`;
    canvas.style.mixBlendMode = this.mixBlendMode;
    this.adjustSize();
    map.getPanes()[this.paneName].appendChild(canvas);
    this.bindEvent();
    this._draw();
    return this.canvas;
  },

  _render: function (canvas) {
    if (!this.getData() || !this.map) return this;
    const opt = this.getWindOptions();

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
      this.wind.prerender();
      this.wind.render();
    }

    return this;
  },
  bindEvent: function () {
    this.map.addEventListener("resize", this.handleResize);

    this.map.addEventListener("movestart", this.stop);
    this.map.addEventListener("moveend", this.startAndDraw);
  },
  getWindOptions: function () {
    return this.options.windOptions || {};
  },
  onRemove: function () {
    console.log("执行删除");
    var parent = this.div.parentNode;
    if (parent) {
      parent.removeChild(this.div);
      this.map = null;
      this.div = null;
    }
  },
  start: function () {
    if (this.wind) {
      console.log("start");
      this.wind.start();
    }
  },
  stop: function () {
    if (this.wind) {
      console.log("stop");
      this.wind.stop();
    }
  },
  handleResize: function () {
    console.log("可是区域变化");
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

    console.log("查看数据是否赋值", this.field);

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
    console.log("chonghui");
    this._draw();
  },
});

const WindLayer = TMapWind;

export { WindLayer };

export default TMapWind;
