import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    // 是否启用地图拖拽
    isEnableDrag: true,
    // 是否启用滚轮放大缩小
    isScrollWheelZoom: true,
  }),
  actions: {
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
  },
});
