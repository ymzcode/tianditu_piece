import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { airNow, citySearch, localNationalStation } from "@/api/qweather";
import { debounce } from "@/utils/common";
import dayjs from "dayjs";
// dayjs().locale('zh-cn').format()

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
    // 混合天气展示开关
    mixedWeatherSwitch: {
      // 实时天气
      weatherNow: false,
      // 7日天气预报
      weather7d: false,
      // 24小时天气预报
      weather24h: false,
      // 分钟级降水预报
      minutely5m: false,
      // 天气指数预报
      indices1d: false,
      // 拾点器对象
      coordinatePickup: null,
      // 拾点器获取的数据
      lnglat: null,
    },
  }),
  actions: {
    // 检查key是否填写
    checkInput() {
      if (!this.apiKey) {
        window.$message.warning("请填写key后再调用接口");
        throw new Error("请填写key后再调用接口");
      }
    },
    // 获取apikey
    getApiKey() {
      this.checkInput();
      return this.apiKey;
    },
    // 城市搜索
    api_citySearch: debounce(function (e) {
      // console.log(e);
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
      const { addMarkerClusterer } = useTiandituStore();
      localNationalStation().then((res) => {
        console.log(res);
        const markerArr = [];
        // 创建信息窗口, 多个点公用一个
        const infoWin1 = new window.T.InfoWindow();
        res.map((item) => {
          const marker = new window.T.Marker(
            new window.T.LngLat(item.POI_Longitude, item.POI_Latitude),
            { title: item.POI_Name }
          );
          marker.addEventListener("click", function () {
            const _item = item;
            let sContent = `${_item.POI_Name}<br>请求接口中···`;
            infoWin1.setContent(sContent);
            airNow({ location: _item.Location_ID }).then((airNowData) => {
              // console.log(airNowData);
              airNowData = airNowData.now;
              sContent = `
                <div class="flex flex-col items-center justify-center">
                    <h2>${_item.POI_Name}</h2>
                    <div>空气质量数据发布时间：<span class="text-red-400">${dayjs(
                      airNowData.pubTime
                    ).format("YYYY-MM-DD HH:mm:ss")}</span></div>
                    <div>空气质量指数：${airNowData.aqi}</div>
                    <div>空气质量指数等级：${airNowData.level}</div>
                    <div>空气质量指数级别：${airNowData.category}</div>
                    <div>空气质量的主要污染物：${airNowData.primary}</div>
                    <div>PM10：${airNowData.pm10}</div>
                    <div>PM2.5：${airNowData.pm2p5}</div>
                    <div>二氧化氮：${airNowData.no2}</div>
                    <div>二氧化硫：${airNowData.so2}</div>
                    <div>一氧化碳：${airNowData.co}</div>
                    <div>臭氧：${airNowData.o3}</div>
                </div>
              `;
              infoWin1.setContent(sContent);
            });
            marker.openInfoWindow(infoWin1);
          });
          markerArr.push(marker);
        });

        // 使用项目自带的方法，方便统一管理
        const _MarkerClusterer = addMarkerClusterer("nationalStation", {
          markers: markerArr,
        });
      });
    },
    /*
     * 销毁全国监测站数据
     * */
    removeNationalStation() {
      const { removeMarkerClusterer } = useTiandituStore();
      // 从地图上彻底清除所有的标记。
      removeMarkerClusterer("nationalStation");
    },
    /*
     * 注册混合天气拾点器
     * */
    createMixedWeatherCoordinatePickup() {
      const { Tmap, updateOverLay, searchOverLay, addOverLay } =
        useTiandituStore();
      if (this.mixedWeatherSwitch.coordinatePickup) return;
      const cp = new window.T.CoordinatePickup(Tmap, {
        callback: (lnglat) => {
          console.log(lnglat);
          const marker = new window.T.Marker(lnglat, {
            icon: new window.T.Icon({
              iconUrl: "/src/assets/img/map-icon/position-1.png",
              iconSize: new window.T.Point(40, 40),
            }),
          });
          const id = "mixedWeather";
          searchOverLay(id)
            ? updateOverLay(id, marker)
            : addOverLay(id, marker);
          Tmap.panTo(lnglat);
          this.mixedWeatherSwitch.lnglat = lnglat;
        },
      });
      cp.addEvent();
      this.mixedWeatherSwitch.coordinatePickup = cp;
    },
    /*
     * 销毁拾点器
     * */
    removeMixedWeatherCoordinatePickup() {
      const { removeOverLay } = useTiandituStore();
      this.mixedWeatherSwitch.coordinatePickup &&
        this.mixedWeatherSwitch.coordinatePickup.removeEvent();
      this.mixedWeatherSwitch.coordinatePickup = null;
      removeOverLay("mixedWeather");
    },
  },
});
