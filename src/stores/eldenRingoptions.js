import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";

export const useEldenRingOptionsStore = defineStore("eldenRingOptions", {
  state: () => ({}),
  actions: {
    /*
     * 切换为游戏地图
     * */
    initEldenRingMap() {
      const imageURL =
        "https://file.bingyishow.top/tianditu_piece/img/elden-ring-map/IMG_MAP/{z}_{x}_{y}.jpg";
      //创建自定义图层对象
      const lay = new window.T.TileLayer(imageURL, { minZoom: 1, maxZoom: 6 });
      const { Tmap, addTileLayer } = useTiandituStore();
      addTileLayer("EldenRing", lay);
      Tmap.setMaxZoom(6);
    },
    /*
     * 移除地图
     * */
    removeEldenRingMap() {
      const { Tmap, removeTileLayer } = useTiandituStore();
      removeTileLayer("EldenRing");
      Tmap.setMaxZoom(18);
    },
  },
});
