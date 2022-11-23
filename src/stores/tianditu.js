import { defineStore } from "pinia";

export const useTiandituStore = defineStore("tianditu", {
  state: () => ({
    // 全局天地图组件视图对象
    Tmap: null,
  }),
  actions: {
    initTmap(Tmap) {
      if (this.Tmap) {
        console.log("天地图已经完成初始化，跳过初始化");
        return
      }
      if (!Tmap) {
        console.error("Tmap传递为空");
        return;
      }
      this.Tmap = Tmap;
      console.log("天地图初始化成功");
      this.Tmap.centerAndZoom(new window.T.LngLat(116.40769, 39.89945), 12);
    },
  },
});
