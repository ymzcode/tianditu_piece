<script setup>
import { NSwitch, NDivider } from "naive-ui";
import {useMapOptionsStore} from "@/stores/mapOptions";
const pinia_settingStore = useMapOptionsStore();
</script>

<template>
  <!--        是否启用地图拖拽-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用地图拖拽</div>
    <n-switch
      :value="pinia_settingStore.isEnableDrag"
      @click="pinia_settingStore.switchEnableDrag()"
    />
  </div>
  <n-divider />
  <!--        是否启用地图拖拽-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用滚轮放大缩小</div>
    <n-switch
      :value="pinia_settingStore.isScrollWheelZoom"
      @click="pinia_settingStore.switchScrollWheelZoom()"
    />
  </div>
  <n-divider />
  <!--        是否启用地图拖拽-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用双击放大</div>
    <n-switch
      :value="pinia_settingStore.isDoubleClickZoom"
      @click="pinia_settingStore.switchDoubleClickZoom()"
    />
  </div>
  <n-divider />
  <!--        是否启用键盘操作-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用键盘操作</div>
    <n-switch
      :value="pinia_settingStore.isKeyboard"
      @click="pinia_settingStore.switchKeyboard()"
    />
  </div>
  <n-divider />
  <!--        是否启用惯性拖拽-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用惯性拖拽</div>
    <n-switch
      :value="pinia_settingStore.isInertia"
      @click="pinia_settingStore.switchInertia()"
    />
  </div>
  <n-divider />
  <!--        是否启用连续缩放-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用连续缩放</div>
    <n-switch
      :value="pinia_settingStore.isContinuousZoom"
      @click="pinia_settingStore.switchContinuousZoom()"
    />
  </div>
  <n-divider />
  <!--        是否启用双指缩放-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用双指缩放</div>
    <n-switch
      :value="pinia_settingStore.isPinchToZoom"
      @click="pinia_settingStore.switchPinchToZoom()"
    />
  </div>
  <n-divider />
  <!--        是否启用自动适应容器尺寸-->
  <div class="flex flex-row items-center justify-between">
    <div class="item-title">是否启用自动适应容器尺寸</div>
    <n-switch
      :value="pinia_settingStore.isAutoResize"
      @click="pinia_settingStore.switchAutoResize()"
    />
  </div>
</template>

<style scoped></style>
