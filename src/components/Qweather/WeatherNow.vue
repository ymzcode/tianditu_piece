<script setup>
import { onMounted, ref } from "vue";
import { NSkeleton } from "naive-ui";
const show = ref(false);
onMounted(() => {
  console.log("jiazai");
  setTimeout(() => {
    show.value = true;
  }, 2000);
});
</script>

<template>
  <n-skeleton v-if="!show" text :repeat="2" />
  <div v-else class="flex flex-col">
    <div>数据观测时间：<span></span></div>
    <div>温度，默认单位：摄氏度：<span></span></div>
    <div>体感温度，默认单位：摄氏度：<span></span></div>
    <div>天气状况和图标的代码：<span></span></div>
    <div>天气状况的文字描述：<span></span></div>
    <div>风向360角度：<span></span></div>
    <div>风向：<span></span></div>
    <div>风力等级：<span></span></div>
    <div>风速，公里/小时：<span></span></div>
    <div>相对湿度，百分比数值：<span></span></div>
    <div>当前小时累计降水量，默认单位：毫米：<span></span></div>
    <div>大气压强，默认单位：百帕：<span></span></div>
    <div>能见度，默认单位：公里：<span></span></div>
    <div>云量，百分比数值。可能为空：<span></span></div>
    <div>露点温度。可能为空：<span></span></div>
  </div>
</template>

<style scoped></style>
