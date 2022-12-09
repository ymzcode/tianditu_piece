<script setup>
import { NList, NListItem, NButton, NInput } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import { useEchartsOptionsStore } from "@/stores/echartsOptions";

const pinia_useEchartsOptionsStore = useEchartsOptionsStore();

const lngTest = (val) => {
  return /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/.test(
    val
  );
};

const latTest = (val) => {
  return /^(\-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/.test(
    val
  );
};
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
          <n-button
            type="info"
            @click="pinia_useEchartsOptionsStore.createPieChartDemo"
            >试试添加一个饼图</n-button
          >
          <n-button
            class="ml-2"
            type="info"
            @click="pinia_useEchartsOptionsStore.createScatterColor"
            >试试添加一个散点图</n-button
          >
        </div>
      </div>
      <template #suffix>
        <n-button
          type="warning"
          @click="pinia_useEchartsOptionsStore.removePieChartDemo"
          >销毁</n-button
        >
      </template>
    </n-list-item>
    <n-list-item>
      <div class="flex flex-col">
        <div>自定义Echarts图表</div>
        <div class="my-2 text-gray-500">说明：</div>
        <div class="mb-2 flex flex-row">
          <n-input
            class="mr-2"
            v-model:value="pinia_useEchartsOptionsStore.customEchartsLnglat[0]"
            clearable
            :allow-input="lngTest"
            placeholder="经度(lng)"
          />
          <n-input
            class="ml-2"
            v-model:value="pinia_useEchartsOptionsStore.customEchartsLnglat[1]"
            clearable
            :allow-input="latTest"
            placeholder="纬度(lat)"
          />
        </div>
        <div>
          <n-input
            v-model:value="pinia_useEchartsOptionsStore.inputOption"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 20,
            }"
            placeholder="echarts的option(json格式)"
          />
        </div>
      </div>
      <template #suffix>
        <n-button
          type="info"
          @click="pinia_useEchartsOptionsStore.createCustomEcharts"
          >生成</n-button
        >
        <n-button
          class="mt-2"
          type="warning"
          @click="pinia_useEchartsOptionsStore.removeCustomEcharts"
          >销毁</n-button
        >
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
