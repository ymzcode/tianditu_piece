import { defineStore } from "pinia";
import kindergarten from "@/assets/json/kindergarten-new.json";
import { useTiandituStore } from "@/stores/tianditu";
import { nationalKindergarten } from "@/api/mapDataAPi";

export const useMarkerStore = defineStore("markerOptions", {
  state: () => ({}),
  actions: {
    /*
     * 初始化海量幼儿园数据*/
    async initKindergarten(isUseLocalMapData = true) {
      console.log(kindergarten);
      let mapData;
      // 判断是否使用本地数据
      if (isUseLocalMapData) {
        mapData = kindergarten.data;
      } else {
        const { data } = await nationalKindergarten();
        mapData = data;
      }

      let lnglats = [];
      mapData.results.map((item) => {
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
