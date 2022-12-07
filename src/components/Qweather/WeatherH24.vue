<script setup>
import { computed, onMounted, ref } from "vue";
import { NSkeleton, NTimeline, NTimelineItem } from "naive-ui";
import { weather24h } from "@/api/qweather";
import dayjs from "dayjs";

const show = ref(false);
// 7天的数据
const weather24hData = ref([]);

const props = defineProps({
  location: String,
});

onMounted(() => {
  weather24h({
    location: props.location,
  }).then((res) => {
    // console.log(res);
    weather24hData.value = res.hourly;
    show.value = true;
  });
});

const fxTimeFormat = computed(() => {
  return (e) => {
    // console.log(e);
    return dayjs(e).format("YYYY-MM-DD HH:mm:ss");
  };
});
</script>

<template>
  <n-skeleton v-if="!show" text :repeat="2" />
  <div v-else class="flex flex-col">
    <n-timeline>
      <n-timeline-item
        v-for="item in weather24hData"
        :key="item.fxTime"
        type="success"
        :time="fxTimeFormat(item.fxTime)"
      >
        <template #header> 预报日期：{{ fxTimeFormat(item.fxTime) }} </template>
        <div>温度 ：{{ item.temp }}</div>
        <div>天气状况和图标的代码 ：{{ item.icon }}</div>
        <div>天气状况的文字描述 ：{{ item.text }}</div>
        <div>风向360角度 ：{{ item.wind360 }}</div>
        <div>风向 ：{{ item.windDir }}</div>
        <div>风力等级 ：{{ item.windScale }}</div>
        <div>风速 ：{{ item.windSpeed }}</div>
        <div>相对湿度 ：{{ item.humidity }}</div>
        <div>当前小时累计降水量 ：{{ item.precip }}</div>
        <div>逐小时预报降水概率 ：{{ item.pop }}</div>
        <div>大气压强 ：{{ item.pressure }}</div>
        <div>云量 ：{{ item.cloud }}</div>
        <div>露点温度 ：{{ item.dew }}</div>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<style scoped></style>
