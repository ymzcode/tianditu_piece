import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import {
  localNationalKindergarten,
  nationalKindergarten,
} from "@/api/mapDataAPi";
import { isShowErrorMessage } from "@/config";

export const useMarkerStore = defineStore("markerOptions", {
  state: () => ({
    // 存储播放幼儿园数据的 Interval
    kindergartenInterval: null,
  }),
  actions: {
    /*
     * 初始化海量幼儿园数据*/
    async initKindergarten(
      isUseLocalMapData = true,
      kindergartenDataSlider = 1000,
      kindergartenDataSliderStart = 0
    ) {
      let mapData;
      // 判断是否使用本地数据
      if (isUseLocalMapData) {
        const { data } = await localNationalKindergarten();
        mapData = data;
      } else {
        const { data } = await nationalKindergarten();
        mapData = data;
      }

      let lnglats = [];
      mapData.results
        .slice(kindergartenDataSliderStart, kindergartenDataSlider)
        .map((item) => {
          const co = item.geojson.geometry.coordinates[0];
          const lng = new window.T.LngLat(co[0], co[1]);
          lnglats.push(lng);
        });
      const _CloudCollection = new window.T.CloudMarkerCollection(lnglats, {
        color: "blue",
        SizeType: window.TDT_POINT_SIZE_NORMAL,
      });
      const { addOverLay, Tmap } = useTiandituStore();
      addOverLay("kindergarten", _CloudCollection);
      Tmap.setViewport(lnglats);
    },
    /*
     * 销毁海量幼儿园数据*/
    removeKindergarten() {
      const { removeOverLay } = useTiandituStore();
      removeOverLay("kindergarten");
    },
    /*
     * 动态播放幼儿园数据*/
    playKindergartenData() {
      const { mapOverLay } = useTiandituStore();
      // 判断是否已经生成视图
      if (!mapOverLay["kindergarten"]) {
        isShowErrorMessage &&
          window.$message.error("请生成视图之后再播放数据！");
        throw new Error("请生成视图之后再播放数据");
      }
      clearInterval(this.kindergartenInterval);
      this.kindergartenInterval = setInterval(async () => {
        let mapData;
        const { data } = await localNationalKindergarten();
        mapData = data;
        // 存放生成的点数据
        let lnglats = [];
        //  设置一个开始分割点  [10 - 180000]
        const start = parseInt(Math.random() * (180000 - 10) + 10);
        // 设置一个步长值 [1000 - 3000]
        const step = parseInt(Math.random() * (3000 - 1000) + 1000);
        mapData.results.slice(start, start + step).map((item) => {
          const co = item.geojson.geometry.coordinates[0];
          const lng = new window.T.LngLat(co[0], co[1]);
          lnglats.push(lng);
        });
        mapOverLay["kindergarten"].setLnglats(lnglats);
      }, 3000);
    },
    /*
     * 停止播放幼儿园数据*/
    stopKindergartenData() {
      clearInterval(this.kindergartenInterval);
    },
  },
});
