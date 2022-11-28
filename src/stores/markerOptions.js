import { defineStore } from "pinia";
import kind from "@/assets/json/kindergarten.json";
import { useTiandituStore } from "@/stores/tianditu";

export const useMarkerStore = defineStore("markerOptions", {
  state: () => ({}),
  actions: {
    /*
     * 初始化海量幼儿园数据*/
    initKindergarten() {
      console.log(kind);
      const { data } = kind;
      let lnglats = [];
      data.results.map((item) => {
        const co = item.geojson.geometry.coordinates[0];
        const lng = new window.T.LngLat(co[0], co[1]);
        lnglats.push(lng);
      });
      const _CloudCollection = new window.T.CloudMarkerCollection(lnglats, {
        color: "blue",
        SizeType: window.TDT_POINT_SIZE_SMALL,
      });
      const { addOverLay } = useTiandituStore();
      addOverLay("kind", _CloudCollection);
    },
  },
});
