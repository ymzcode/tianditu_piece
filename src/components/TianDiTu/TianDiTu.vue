<script setup>
import { onMounted } from "vue";
import { useTiandituStore } from "@/stores/tianditu";
import { useSettingStore } from "@/stores/setting";
import {randomCreateMapType, randomCreateUrl} from "@/utils/demoUtils";

onMounted(() => {

  loadJs(randomCreateUrl()).then(
    (res) => {
      // 创建地图视图，初始化
      const map = new window.T.Map("mapTian");
      // 在window注册map，用于支持标绘控件
      window.map = map;
      const pinia_useTiandituStore = useTiandituStore();
      const pinia_useSettingStore = useSettingStore();
      pinia_useTiandituStore.initTmap(map);
      pinia_useSettingStore.initSetting();
      // 随机设置一个图层
      map.setMapType(randomCreateMapType())
    }
  );
});

// 动态加载js
function loadJs(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve("success");
    };
    script.onerror = () => {
      reject("error");
    };
  });
}
</script>

<template>
  <div id="mapTian" class="w-full h-full"></div>
</template>

<style scoped>
</style>
