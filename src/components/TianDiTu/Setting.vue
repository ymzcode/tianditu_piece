<script setup>
import { onMounted, ref } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NCollapse,
  NCollapseItem,
  NTag,
  NButton,
} from "naive-ui";
import ControlOptions from "@/components/SettingItems/ControlOptions.vue";
import MapOptions from "@/components/SettingItems/MapOptions.vue";
import MarkerOptions from "@/components/SettingItems/MarkerOptions.vue";
import { version } from "@/config";
import QweatherOptions from "@/components/SettingItems/QweatherOptions.vue";
import QweatherMixedWeather from "@/components/MapPopup/QweatherMixedWeather.vue";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";
import EchartsOptions from "@/components/SettingItems/EchartsOptions.vue";

// 展示抽屉
const isShowModel = ref(false);
const pinia_useQweatherOptionsStore = useQweatherOptionsStore();
</script>

<template>
  <div
    v-if="!isShowModel"
    @click="isShowModel = true"
    class="fixed right-3 top-1/2 rounded-full cursor-pointer p-2 bg-black text-white"
    style="z-index: 9999"
  >
    设置
  </div>
  <n-drawer v-model:show="isShowModel" :width="500">
    <n-drawer-content title="地图设置" closable>
      <template #header>
        地图设置
        <n-tag size="small"> {{ version }} </n-tag>
      </template>
      <div class="flex flex-col">
        <n-collapse>
          <n-collapse-item title="地图属性控制" name="1">
            <!--            地图选项组件-->
            <map-options></map-options>
          </n-collapse-item>
          <n-collapse-item title="控件相关" name="2">
            <!--            控件选项组件-->
            <control-options></control-options>
          </n-collapse-item>
          <n-collapse-item title="覆盖物相关" name="3">
            <!--            覆盖物选项组件-->
            <marker-options></marker-options>
          </n-collapse-item>
          <n-collapse-item title="和风天气" name="4">
            <template #header-extra>
              <n-button
                size="tiny"
                text
                tag="a"
                href="https://www.qweather.com"
                target="_blank"
                type="primary"
              >
                天气服务由和风天气驱动
              </n-button>
            </template>
            <!--            和风天气选项组件-->
            <qweather-options></qweather-options>
          </n-collapse-item>
          <n-collapse-item title="Echarts图表" name="5">
            <!--            echarts应用组件-->
            <echarts-options></echarts-options>
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-drawer-content>
  </n-drawer>
  <!--  和风天气混合天气内容展示弹框-->
  <qweather-mixed-weather
    v-if="pinia_useQweatherOptionsStore.mixedWeatherSwitch.mapPopupShow"
  ></qweather-mixed-weather>
</template>

<style scoped></style>
