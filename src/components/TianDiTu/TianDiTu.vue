<script setup>
import { onMounted } from "vue";
import { tianditu_token } from "@/config/index";
import { useTiandituStore } from "@/stores/tianditu";

onMounted(() => {
  loadJs(`https://api.tianditu.gov.cn/api?v=4.0&tk=${tianditu_token}`).then(
    (res) => {
      const map = new window.T.Map("mapTian");
      const pinia_useTiandituStore = useTiandituStore();
      pinia_useTiandituStore.initTmap(map);
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
  <div
    id="mapTian"
    class="w-full h-full"
  ></div>
</template>

<style scoped>
</style>
