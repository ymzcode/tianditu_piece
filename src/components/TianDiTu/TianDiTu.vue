<script setup>
import { computed, onMounted, ref } from "vue";
import { useTiandituStore } from "@/stores/tianditu";
import { useSettingStore } from "@/stores/setting";
import { randomCreateMapType, randomCreateUrl } from "@/utils/demoUtils";
import { loadJs } from "@/utils/common";

const pinia_useTiandituStore = useTiandituStore();
const pinia_useSettingStore = useSettingStore();

onMounted(() => {
  loadJs(randomCreateUrl()).then((res) => {
    // 创建地图视图，初始化
    const map = new window.T.Map("mapTian");
    // 在window注册map，用于支持标绘控件
    window.map = map;
    pinia_useTiandituStore.initTmap(map);
    pinia_useSettingStore.initSetting();
    // 随机设置一个图层
    map.setMapType(randomCreateMapType());
  });
});

const customWidth = computed(() => {
  return `calc(100vw - ${pinia_useSettingStore.drawerWidth}px)`;
});
</script>

<template>
  <div
    id="mapTian"
    class="w-full h-full relative overflow-hidden"
    :style="`width: ${customWidth}`"
  ></div>
</template>

<style scoped></style>
