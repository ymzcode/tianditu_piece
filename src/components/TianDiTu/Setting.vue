<script setup>
import { ref } from "vue";
import { NDrawer, NDrawerContent, NSwitch, NDivider } from "naive-ui";
import {useSettingStore} from "@/stores/setting";

// 展示抽屉
const isShowModel = ref(false);

const pinia_settingStore = useSettingStore()
</script>

<template>
  <div
    v-if="!isShowModel"
    @click="isShowModel = true"
    class="fixed right-3 top-1/2 rounded-full cursor-pointer p-2 bg-blue-300 text-white"
    style="z-index: 9999"
  >
    设置
  </div>
  <n-drawer v-model:show="isShowModel" :width="500">
    <n-drawer-content title="地图设置" closable>
      <div class="flex flex-col">
        <!--        是否启用地图拖拽-->
        <div class="flex flex-row items-center justify-between">
          <div>是否启用地图拖拽</div>
          <n-switch :value="pinia_settingStore.isEnableDrag" @click="pinia_settingStore.switchEnableDrag()"/>
        </div>
        <n-divider />
        <!--        是否启用地图拖拽-->
        <div class="flex flex-row items-center justify-between">
          <div>是否启用滚轮放大缩小</div>
          <n-switch :value="pinia_settingStore.isScrollWheelZoom" @click="pinia_settingStore.switchScrollWheelZoom()"/>
        </div>
        <n-divider />
        <!--        是否启用地图拖拽-->
        <div class="flex flex-row items-center justify-between">
          <div>是否启用双击放大</div>
          <n-switch :value="pinia_settingStore.isDoubleClickZoom" @click="pinia_settingStore.switchDoubleClickZoom()"/>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
