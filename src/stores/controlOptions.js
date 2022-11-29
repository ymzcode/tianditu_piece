import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { isShowErrorMessage } from "@/config";

export const useControlOptionsStore = defineStore("controlOptions", {
  state: () => ({
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
    // 开关版权控件
    switchShowCopyright(flag) {
      const { Tmap, mapControl } = useTiandituStore();
      // 检查当前是否存在版权控件对象
      if (!mapControl["github"]) {
        isShowErrorMessage &&
          window.$message.error("当前版权控件已经销毁，请重新生成！");
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
        isShowErrorMessage &&
          window.$message.error("当前版权控件已经销毁，请重新生成！");
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
        isShowErrorMessage &&
          window.$message.error("当前版权控件已经销毁，请重新生成！");
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
        isShowErrorMessage &&
          window.$message.error("当前版权控件已经销毁，请重新生成！");
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
        isShowErrorMessage &&
          window.$message.error("当前版权控件已经销毁，请重新生成！");
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
        isShowErrorMessage &&
          window.$message.error("当前版权控件已经销毁，请重新生成！");
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
