<script setup>
import { computed, onMounted, ref } from "vue";
import { NSkeleton, NTimeline, NTimelineItem } from "naive-ui";
import { weather7d } from "@/api/qweather";

const show = ref(false);
// 7天的数据
const weather7dData = ref([]);

const props = defineProps({
  location: String,
});

onMounted(() => {
  weather7d({
    location: props.location,
  }).then((res) => {
    // console.log(res);
    weather7dData.value = res.daily;
    show.value = true;
  });
});
</script>

<template>
  <n-skeleton v-if="!show" text :repeat="2" />
  <div v-else class="flex flex-col">
    <n-timeline>
      <n-timeline-item
        v-for="item in weather7dData"
        :key="item.fxDate"
        type="success"
        :time="item.fxDate"
      >
        <template #header> 预报日期：{{ item.fxDate }} </template>
        <div>日出时间 ：{{ item.sunrise }}</div>
        <div>日落时间 ：{{ item.sunset }}</div>
        <div>当天月升时间 ：{{ item.moonrise }}</div>
        <div>当天月落时间 ：{{ item.moonset }}</div>
        <div>月相名称 ：{{ item.moonPhase }}</div>
        <div>月相图标代码 ：{{ item.moonPhaseIcon }}</div>
        <div>预报当天最高温度 ：{{ item.tempMax }}</div>
        <div>预报当天最低温度 ：{{ item.tempMin }}</div>
        <div>预报白天天气状况的图标代码 ：{{ item.iconDay }}</div>
        <div>预报白天天气状况文字描述 ：{{ item.textDay }}</div>
        <div>预报夜间天气状况的图标代码 ：{{ item.iconNight }}</div>
        <div>预报晚间天气状况文字描述 ：{{ item.textNight }}</div>
        <div>预报白天风向360角度 ：{{ item.wind360Day }}</div>
        <div>预报白天风向 ：{{ item.windDirDay }}</div>
        <div>预报白天风力等级 ：{{ item.windScaleDay }}</div>
        <div>预报白天风速，公里/小时 ：{{ item.windSpeedDay }}</div>
        <div>预报夜间风向360角度 ：{{ item.wind360Night }}</div>
        <div>预报夜间当天风向 ：{{ item.windDirNight }}</div>
        <div>预报夜间风力等级 ：{{ item.windScaleNight }}</div>
        <div>预报夜间风速，公里/小时 ：{{ item.windSpeedNight }}</div>
        <div>预报当天总降水量(默认单位：毫米) ：{{ item.precip }}</div>
        <div>紫外线强度指数 ：{{ item.uvIndex }}</div>
        <div>相对湿度 ：{{ item.humidity }}</div>
        <div>大气压强 ：{{ item.pressure }}</div>
        <div>能见度 ：{{ item.vis }}</div>
        <div>云量 ：{{ item.cloud }}</div>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<style scoped></style>
