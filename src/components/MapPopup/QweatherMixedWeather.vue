<script setup>
import { NTabs, NTabPane } from "naive-ui";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";
import WeatherNow from "@/components/Qweather/WeatherNow.vue";
import { computed, onMounted, ref } from "vue";
import { useTiandituStore } from "@/stores/tianditu";
import WeatherD7 from "@/components/Qweather/WeatherD7.vue";
import WeatherH24 from "@/components/Qweather/WeatherH24.vue";
const pinia_useQweatherOptionsStore = useQweatherOptionsStore();
const pinia_useTiandituStore = useTiandituStore();

const tabsInstRef = ref(null);
const isEmpty = computed(() => {
  const { weatherNow, weather7d, weather24h, minutely5m, indices1d } =
    pinia_useQweatherOptionsStore.mixedWeatherSwitch;
  if (!weather7d && !weatherNow && !weather24h && !minutely5m && !indices1d) {
    return true;
  } else {
    return false;
  }
});

// 动态设置弹出框的位置
const mixedStyle = computed(() => {
  const { Tmap } = pinia_useTiandituStore;
  const { mixedWeatherSwitch } = pinia_useQweatherOptionsStore;
  const point = Tmap && Tmap.lngLatToContainerPoint(mixedWeatherSwitch.lnglat);
  // console.log(point);
  const t = point.y - 180;
  const l = point.x + 25;
  return {
    top: `${t}px`,
    left: `${l}px`,
  };
});

// 拾点的坐标
const location = ref("");

onMounted(() => {
  const lnglat = pinia_useQweatherOptionsStore.mixedWeatherSwitch.lnglat;
  // 设置location
  location.value = `${lnglat.lng},${lnglat.lat}`;
});
</script>

<template>
  <div
    class="fixed flex flex-row justify-start items-center mixed-body"
    :style="mixedStyle"
  >
    <!--      定义小三角形-->
    <div class="triangle"></div>
    <div class="bg-white py-3 px-4 rounded-2xl" style="width: 260px">
      <div v-if="isEmpty">请在【设置- 天气混合展示】中至少开启一个展示内容</div>
      <n-tabs v-else ref="tabsInstRef" type="card" animated>
        <n-tab-pane
          v-if="pinia_useQweatherOptionsStore.mixedWeatherSwitch.weatherNow"
          display-directive="show:lazy"
          name="weatherNow"
          tab="实时天气"
        >
          <weather-now class="mixed-content"></weather-now>
        </n-tab-pane>
        <n-tab-pane
          v-if="pinia_useQweatherOptionsStore.mixedWeatherSwitch.weather7d"
          display-directive="show:lazy"
          name="weather7d"
          tab="7日天气预报"
        >
          <weather-d7 :location="location" class="mixed-content"></weather-d7>
        </n-tab-pane>
        <n-tab-pane
          v-if="pinia_useQweatherOptionsStore.mixedWeatherSwitch.weather24h"
          name="weather24h"
          display-directive="show:lazy"
          tab="24小时天气预报"
        >
          <weather-h24 :location="location" class="mixed-content"></weather-h24>
        </n-tab-pane>
        <n-tab-pane
          v-if="pinia_useQweatherOptionsStore.mixedWeatherSwitch.minutely5m"
          name="minutely5m"
          tab="分钟级降水预报"
        >
          七里香
        </n-tab-pane>
        <n-tab-pane
          v-if="pinia_useQweatherOptionsStore.mixedWeatherSwitch.indices1d"
          name="indices1d"
          tab="天气指数预报"
        >
          七里香
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<style scoped>
.mixed-body {
  z-index: 999;
  width: 320px;
  height: 360px;
  overflow: hidden;
}
.mixed-content {
  max-height: 260px;
  overflow-y: scroll;
}
.triangle {
  display: inline-block;
  border: 10px solid;
  border-color: transparent #ffffff transparent transparent;
}
</style>
