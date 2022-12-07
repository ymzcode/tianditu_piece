<script setup>
import { computed, onMounted, ref } from "vue";
import { NSkeleton, NTimeline, NTimelineItem } from "naive-ui";
import { minutely5m } from "@/api/qweather";
import dayjs from "dayjs";

const show = ref(false);
// 分钟降水预报
const minutely5mData = ref([]);
// 预报描述
const summary = ref("");

const props = defineProps({
  location: String,
});

onMounted(() => {
  minutely5m({
    location: props.location,
  }).then((res) => {
    // console.log(res);
    minutely5mData.value = res.minutely;
    summary.value = res.summary;
    show.value = true;
  });
});

const fxTimeFormat = computed(() => {
  return (e) => {
    // console.log(e);
    return dayjs(e).format("YYYY-MM-DD HH:mm:ss");
  };
});

const minutelyType = computed(() => {
  return (e) => {
    switch (e) {
      case "rain":
        return "雨";
      case "snow":
        return "雪";
      default:
        return "未知";
    }
  };
});
</script>

<template>
  <n-skeleton v-if="!show" text :repeat="2" />
  <div v-else class="flex flex-col">
    <n-timeline>
      <n-timeline-item type="warning" :title="summary"></n-timeline-item>
      <n-timeline-item
        v-for="item in minutely5mData"
        :key="item.fxTime"
        type="success"
        :time="fxTimeFormat(item.fxTime)"
      >
        <template #header> 预报日期：{{ fxTimeFormat(item.fxTime) }} </template>
        <div>10分钟累计降水量 ：{{ item.precip }}</div>
        <div>降水类型 ：{{ minutelyType(item.type) }}</div>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<style scoped></style>
