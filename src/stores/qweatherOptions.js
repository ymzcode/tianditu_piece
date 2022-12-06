import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { citySearch, localNationalStation } from "@/api/qweather";
import { debounce } from "@/utils/common";

export const useQweatherOptionsStore = defineStore("QweatherOptions", {
  state: () => ({
    // 和风天气免费/付费的apikey
    apiKey: "",
    // 使用免费还是收费地址
    apiUrl: "https://devapi.qweather.com",
    // 城市搜索输入值
    citySearchValue: "",
    // 城市搜索完成后的结果
    citySearchRes: [],
  }),
  actions: {
    // 检查key是否填写
    checkInput() {
      if (!this.apiKey) {
        window.$message.warning("请填写key后再调用接口");
        throw new Error("请填写key后再调用接口");
      }
    },
    // 城市搜索
    api_citySearch: debounce(function (e) {
      // console.log(e);
      this.checkInput();
      citySearch({
        location: this.citySearchValue,
        number: 20,
      }).then((res) => {
        // console.log(res);
        this.citySearchRes = res.location.map((item) => {
          return {
            label: item.name,
            value: item,
          };
        });
      });
    }),
    /*
     * 城市搜索选中事件*/
    citySearchSelect(e) {
      console.log(e);
      // 定位当前城市，并标注
      const { Tmap, addOverLayForType } = useTiandituStore();
      const LngLat = new window.T.LngLat(e.lon, e.lat);
      const marker = new window.T.Marker(LngLat, {
        icon: new window.T.Icon({
          iconUrl: "/src/assets/img/map-icon/city-1.png",
          iconSize: new window.T.Point(40, 40),
        }),
      });
      Tmap.panTo(LngLat);
      addOverLayForType("citySearchPoint", marker);
      const infoWin1 = new window.T.InfoWindow();
      const sContent = `<iframe style="width: 300px;height: 350px;border: 0" src="${e.fxLink}">正在加载···，请稍后</iframe>`;
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function () {
        marker.openInfoWindow(infoWin1);
      });
    },
    /*
     * 销毁城市定位标注*/
    removeCitySearch() {
      const { removeOverLayForType } = useTiandituStore();

      removeOverLayForType("citySearchPoint");
    },
    /*
     * 加载全国监测站数据*/
    loadNationalStation() {
      localNationalStation().then((res) => {
        console.log(res);
      });
    },
  },
});
