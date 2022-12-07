<script setup>
import { onMounted } from "vue";
import { useTiandituStore } from "@/stores/tianditu";
import { useSettingStore } from "@/stores/setting";
import { randomCreateMapType, randomCreateUrl } from "@/utils/demoUtils";
import { loadJs } from "@/utils/common";

onMounted(() => {
  loadJs(randomCreateUrl()).then((res) => {
    // 创建地图视图，初始化
    const map = new window.T.Map("mapTian");
    // 在window注册map，用于支持标绘控件
    window.map = map;
    const pinia_useTiandituStore = useTiandituStore();
    const pinia_useSettingStore = useSettingStore();
    pinia_useTiandituStore.initTmap(map);
    pinia_useSettingStore.initSetting();
    // 随机设置一个图层
    map.setMapType(randomCreateMapType());
  });
});
</script>

<template>
  <div id="mapTian" class="w-full h-full"></div>
</template>

<style scoped></style>
