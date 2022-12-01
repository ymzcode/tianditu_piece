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
    isShowTmapWind: false,
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
          lng.custom_data = item;
          lnglats.push(lng);
        });
      const _CloudCollection = new window.T.CloudMarkerCollection(lnglats, {
        color: "blue",
        SizeType: window.TDT_POINT_SIZE_NORMAL,
      });
      const { addOverLay, Tmap } = useTiandituStore();
      addOverLay("kindergarten", _CloudCollection);
      // 为海量点注册点击事件
      _CloudCollection.addEventListener("click", this.onClickKindergarten);
      Tmap.setViewport(lnglats);
    },
    /*
     * 销毁海量幼儿园数据*/
    removeKindergarten() {
      const { removeOverLay } = useTiandituStore();
      removeOverLay("kindergarten");
    },
    /*
     * 幼儿园海量点的点击事件
     * */
    onClickKindergarten(e) {
      console.log(e);
      const { custom_data } = e.lnglat;
      window.$notification.info({
        content: custom_data.name,
        meta: `地址：${custom_data.address}，code：${custom_data.gbcode}，坐标：${e.lnglat.lng},${e.lnglat.lat}`,
        duration: 3000,
        keepAliveOnHover: true,
      });
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
    initTmapWind() {
      import("tmap-wind").then(({ WindLayer }) => {
        fetch(
          "https://sakitam.oss-cn-beijing.aliyuncs.com/codepen/wind-layer/json/wind.json"
        )
          .then((res) => res.json())
          .then((res) => {
            const pdefinedOverlay = new WindLayer(res);
            console.log(pdefinedOverlay);
            const { addOverLay } = useTiandituStore();
            addOverLay("TmapWind", pdefinedOverlay);
            this.isShowTmapWind = true;
          });
      });
    },
    /*
     * 风场可视化开关*/
    switchTmapWind(flag) {
      const { mapOverLay } = useTiandituStore();
      if (flag == null) {
        this.isShowTmapWind = !this.isShowTmapWind;
      } else {
        this.isShowTmapWind = flag;
      }
      this.isShowTmapWind
        ? mapOverLay["TmapWind"].show()
        : mapOverLay["TmapWind"].hide();
    },
    removeTmapWind() {
      const { removeOverLay } = useTiandituStore();
      removeOverLay("TmapWind");
    },
  },
});
