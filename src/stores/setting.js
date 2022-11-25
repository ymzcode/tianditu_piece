import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    // ------------地图属性开关--------------
    // 是否启用地图拖拽
    isEnableDrag: true,
    // 是否启用滚轮放大缩小
    isScrollWheelZoom: true,
    // 是否启用双击放大
    isDoubleClickZoom: true,
    // 是否启用键盘操作
    isKeyboard: true,
    // 是否启用惯性操作
    isInertia: true,
    // 是否启用连续缩放
    isContinuousZoom: true,
    // 是否启用双指缩放
    isPinchToZoom: true,
    // 是否启用自动适应容器尺寸
    isAutoResize: true,
    // ------------控件相关--------------
    // 是否展示版权控件
    isShowCopyright: true,
    // 是否展示缩放控件
    isShowZoomControl: true,
    // 是否展示比例尺
    isShowScaleControl: true,
    // 是否展示鹰眼控件
    isShowOverviewMap: true,
    // 是否显示地图类型
    isShowMapTypeControl: true,
    // 是否显示符号标绘控件
    isShowMilitarySymbols: true,
  }),
  actions: {
    /*
     * 初始化设置*/
    initSetting() {
      const { mapControl } = useTiandituStore();
      this.createCopyright();
      this.createZoomControl();
      this.createScaleControl();
      this.createOverviewMap();
      this.createMapTypeControl();
      this.createMilitarySymbols();
      window.$mapControl = mapControl;
    },
    // 开关地图拖拽
    switchEnableDrag(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isEnableDrag = !this.isEnableDrag;
      } else {
        this.isEnableDrag = flag;
      }
      this.isEnableDrag ? Tmap.enableDrag() : Tmap.disableDrag();
    },
    // 开关滚轮放大缩小
    switchScrollWheelZoom(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isScrollWheelZoom = !this.isScrollWheelZoom;
      } else {
        this.isScrollWheelZoom = flag;
      }
      this.isScrollWheelZoom
        ? Tmap.enableScrollWheelZoom()
        : Tmap.disableScrollWheelZoom();
    },
    // 开关双击放大
    switchDoubleClickZoom(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isDoubleClickZoom = !this.isDoubleClickZoom;
      } else {
        this.isDoubleClickZoom = flag;
      }
      this.isDoubleClickZoom
        ? Tmap.enableDoubleClickZoom()
        : Tmap.disableDoubleClickZoom();
    },
    // 开关键盘操作
    switchKeyboard(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isKeyboard = !this.isKeyboard;
      } else {
        this.isKeyboard = flag;
      }
      this.isKeyboard ? Tmap.enableKeyboard() : Tmap.disableKeyboard();
    },
    // 开关惯性效果
    switchInertia(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isInertia = !this.isInertia;
      } else {
        this.isInertia = flag;
      }
      this.isInertia ? Tmap.enableInertia() : Tmap.disableInertia();
    },
    // 开关连续缩放
    switchContinuousZoom(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isContinuousZoom = !this.isContinuousZoom;
      } else {
        this.isContinuousZoom = flag;
      }
      this.isContinuousZoom
        ? Tmap.enableContinuousZoom()
        : Tmap.disableContinuousZoom();
    },
    // 开关双指缩放
    switchPinchToZoom(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isPinchToZoom = !this.isPinchToZoom;
      } else {
        this.isPinchToZoom = flag;
      }
      this.isPinchToZoom ? Tmap.enablePinchToZoom() : Tmap.disablePinchToZoom();
    },
    // 开关自适应容器
    switchAutoResize(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isAutoResize = !this.isAutoResize;
      } else {
        this.isAutoResize = flag;
      }
      this.isAutoResize ? Tmap.enableAutoResize() : Tmap.disableAutoResize();
    },
    // 开关版权控件
    switchShowCopyright(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在版权控件对象
      if (!mapControl["github"]) {
        throw new Error("当前版权控件已经销毁，请重新生成！");
      }
      if (flag == null) {
        this.isShowCopyright = !this.isShowCopyright;
      } else {
        this.isShowCopyright = flag;
      }
      if (this.isShowCopyright) {
        mapControl["github"].show();
      } else {
        mapControl["github"].hide();
      }
    },
    /*
     * 销毁版权控件*/
    removeCopyright() {
      const { removeControl } = useTiandituStore();
      removeControl("github");
    },
    /*
     * 创建版权控件*/
    createCopyright() {
      const { Tmap, addControl } = useTiandituStore();
      const copyControl = new window.T.Control.Copyright({
        position: window.T_ANCHOR_TOP_LEFT,
      });
      addControl("github", copyControl);

      const bs = Tmap.getBounds(); //返回地图可视区域
      copyControl.addCopyright({
        id: 1,
        content:
          "<a href='https://github.com/ymzcode/tianditu_piece' target='_blank'>关于我：GitHub</a>",
        bounds: bs,
      });
    },
    // 开关缩放控件
    switchZoomControl(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在对象
      if (!mapControl["zoomControl"]) {
        throw new Error("当前控件已经销毁，请重新生成！");
      }
      if (flag == null) {
        this.isShowZoomControl = !this.isShowZoomControl;
      } else {
        this.isShowZoomControl = flag;
      }
      if (this.isShowZoomControl) {
        mapControl["zoomControl"].show();
      } else {
        mapControl["zoomControl"].hide();
      }
    },
    /*
     * 销毁缩放*/
    removeZoomControl() {
      const { removeControl } = useTiandituStore();
      removeControl("zoomControl");
    },
    /*
     * 创建缩放*/
    createZoomControl() {
      const { Tmap, addControl } = useTiandituStore();
      const copyControl = new window.T.Control.Zoom({
        position: window.T_ANCHOR_TOP_LEFT,
        zoomInText: "🔼",
        zoomOutText: "🔽",
      });
      addControl("zoomControl", copyControl);
    },
    // 开关比例尺控件
    switchScaleControl(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在对象
      if (!mapControl["scaleControl"]) {
        throw new Error("当前控件已经销毁，请重新生成！");
      }
      if (flag == null) {
        this.isShowScaleControl = !this.isShowScaleControl;
      } else {
        this.isShowScaleControl = flag;
      }
      this.isShowScaleControl
        ? mapControl["scaleControl"].show()
        : mapControl["scaleControl"].hide();
    },
    /*
     * 销毁比例尺*/
    removeScaleControl() {
      const { removeControl } = useTiandituStore();
      removeControl("scaleControl");
    },
    /*
     * 创建比例尺*/
    createScaleControl() {
      const { Tmap, addControl } = useTiandituStore();
      const copyControl = new window.T.Control.Scale();
      addControl("scaleControl", copyControl);
      copyControl.setColor("red");
    },
    // 开关鹰眼图
    switchOverviewMap(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在对象
      if (!mapControl["overviewMap"]) {
        throw new Error("当前控件已经销毁，请重新生成！");
      }
      if (flag == null) {
        this.isShowOverviewMap = !this.isShowOverviewMap;
      } else {
        this.isShowOverviewMap = flag;
      }
      this.isShowOverviewMap
        ? mapControl["overviewMap"].show()
        : mapControl["overviewMap"].hide();
    },
    /*
     * 销毁鹰眼图*/
    removeOverviewMap() {
      const { removeControl } = useTiandituStore();
      removeControl("overviewMap");
    },
    /*
     * 创建鹰眼图*/
    createOverviewMap() {
      const { Tmap, addControl } = useTiandituStore();
      const copyControl = new window.T.Control.OverviewMap({
        isOpen: true,
        size: new window.T.Point(150, 150),
      });
      addControl("overviewMap", copyControl);
      copyControl.setBorderColor("blue");
      copyControl.setRectBackColor("pink");
      copyControl.setRectBorderColor("#000000");
    },
    // 开关地图类型
    switchMapTypeControl(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在对象
      if (!mapControl["mapTypeControl"]) {
        throw new Error("当前控件已经销毁，请重新生成！");
      }
      if (flag == null) {
        this.isShowMapTypeControl = !this.isShowMapTypeControl;
      } else {
        this.isShowMapTypeControl = flag;
      }
      this.isShowMapTypeControl
        ? mapControl["mapTypeControl"].show()
        : mapControl["mapTypeControl"].hide();
    },
    /*
     * 销毁地图类型*/
    removeMapTypeControl() {
      const { removeControl } = useTiandituStore();
      removeControl("mapTypeControl");
    },
    /*
     * 创建地图类型*/
    createMapTypeControl() {
      const { Tmap, addControl } = useTiandituStore();
      const copyControl = new window.T.Control.MapType();
      addControl("mapTypeControl", copyControl);
    },
    // 开关符号标绘
    switchMilitarySymbols(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在对象
      if (!mapControl["militarySymbols"]) {
        throw new Error("当前控件已经销毁，请重新生成！");
      }
      if (flag == null) {
        this.isShowMilitarySymbols = !this.isShowMilitarySymbols;
      } else {
        this.isShowMilitarySymbols = flag;
      }
      this.isShowMilitarySymbols
        ? mapControl["militarySymbols"].show()
        : mapControl["militarySymbols"].hide();
    },
    /*
     * 销毁符号标绘*/
    removeMilitarySymbols() {
      const { removeControl } = useTiandituStore();
      removeControl("militarySymbols");
    },
    /*
     * 创建符号标绘*/
    createMilitarySymbols() {
      const { Tmap, addControl } = useTiandituStore();
      const copyControl = new window.T.Control.militarySymbols({
        position: window.T_ANCHOR_TOP_LEFT,
      });
      addControl("militarySymbols", copyControl);
    },
  },
});
