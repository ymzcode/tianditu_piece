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
  }),
  actions: {
    /*
     * 初始化设置*/
    initSetting() {
      const { mapControl } = useTiandituStore();
      this.createCopyright();
      this.createZoomControl();
      this.createScaleControl();
      window.$mapControl = mapControl
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
    switchKeyboard(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isKeyboard = !this.isKeyboard;
      } else {
        this.isKeyboard = flag;
      }
      this.isKeyboard ? Tmap.enableKeyboard() : Tmap.disableKeyboard();
    },
    switchInertia(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isInertia = !this.isInertia;
      } else {
        this.isInertia = flag;
      }
      this.isInertia ? Tmap.enableInertia() : Tmap.disableInertia();
    },
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
    switchPinchToZoom(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isPinchToZoom = !this.isPinchToZoom;
      } else {
        this.isPinchToZoom = flag;
      }
      this.isPinchToZoom ? Tmap.enablePinchToZoom() : Tmap.disablePinchToZoom();
    },
    switchAutoResize(flag) {
      const { Tmap } = useTiandituStore();
      if (flag == null) {
        this.isAutoResize = !this.isAutoResize;
      } else {
        this.isAutoResize = flag;
      }
      this.isAutoResize ? Tmap.enableAutoResize() : Tmap.disableAutoResize();
    },
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
  },
});
