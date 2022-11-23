import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    // 是否启用地图拖拽
    isEnableDrag: true,
    // 是否启用滚轮放大缩小
    isScrollWheelZoom: true,
    // 是否启用双击放大
    isDoubleClickZoom: true,
    // 是否启用键盘操作
    isKeyboard: true,
    // 是否启用惯性操作
    isInertia: true
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
    }
  },
});
