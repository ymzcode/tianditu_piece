<script setup>
import { NList, NListItem, NButton } from "naive-ui";
import { onMounted, ref } from "vue";
import { useEchartsOptionsStore } from "@/stores/echartsOptions";

const pinia_useEchartsOptionsStore = useEchartsOptionsStore();
</script>

<template>
  <n-list>
    <n-list-item>
      <div class="flex flex-col">
        <div>演示示例</div>
        <div class="my-2 text-gray-500">
          说明：你可以添加echarts中几乎所有的图表叠放到地图中
        </div>
        <div>
          <n-button type="info" @click="pinia_useEchartsOptionsStore.createPieChartDemo"
            >试试添加一个饼图</n-button
          >
        </div>
      </div>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
