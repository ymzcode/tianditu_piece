<script setup>
import { computed, onMounted, ref } from "vue";
import { NSkeleton } from "naive-ui";
import { weatherNow } from "@/api/qweather";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";
import dayjs from "dayjs";

const show = ref(false);
const pinia_useQweatherOptionsStore = useQweatherOptionsStore();
const weatherNowData = ref({});

onMounted(() => {
  // console.log(pinia_useQweatherOptionsStore.mixedWeatherSwitch.lnglat);
  const lnglat = pinia_useQweatherOptionsStore.mixedWeatherSwitch.lnglat;
  weatherNow({
    location: `${lnglat.lng},${lnglat.lat}`,
  }).then((res) => {
    // console.log(res);
    weatherNowData.value = res.now;
    show.value = true;
  });
});

// 时间格式化
const obsTimeFormat = computed(() => {
  return dayjs(weatherNowData.value.obsTime).format("YYYY-MM-DD HH:mm:ss");
});
</script>

<template>
  <n-skeleton v-if="!show" text :repeat="2" />
  <div v-else class="flex flex-col">
    <div>
      数据观测时间：<span>{{ obsTimeFormat }}</span>
    </div>
    <div>
      温度，默认单位：摄氏度：<span>{{ weatherNowData.temp }}</span>
    </div>
    <div>
      体感温度，默认单位：摄氏度：<span>{{ weatherNowData.feelsLike }}</span>
    </div>
    <div>
      天气状况和图标的代码：<span>{{ weatherNowData.icon }}</span>
    </div>
    <div>
      天气状况的文字描述：<span>{{ weatherNowData.text }}</span>
    </div>
    <div>
      风向360角度：<span>{{ weatherNowData.wind360 }}</span>
    </div>
    <div>
      风向：<span>{{ weatherNowData.windDir }}</span>
    </div>
    <div>
      风力等级：<span>{{ weatherNowData.windScale }}</span>
    </div>
    <div>
      风速，公里/小时：<span>{{ weatherNowData.windSpeed }}</span>
    </div>
    <div>
      相对湿度，百分比数值：<span>{{ weatherNowData.humidity }}</span>
    </div>
    <div>
      当前小时累计降水量，默认单位：毫米：<span>{{
        weatherNowData.precip
      }}</span>
    </div>
    <div>
      大气压强，默认单位：百帕：<span>{{ weatherNowData.pressure }}</span>
    </div>
    <div>
      能见度，默认单位：公里：<span>{{ weatherNowData.vis }}</span>
    </div>
    <div>
      云量，百分比数值。可能为空：<span>{{ weatherNowData.cloud }}</span>
    </div>
    <div>
      露点温度。可能为空：<span>{{ weatherNowData.dew }}</span>
    </div>
  </div>
</template>

<style scoped></style>
