<script setup>
import { NSwitch, NDivider, NButton, NList, NListItem } from "naive-ui";

import { useControlOptionsStore } from "@/stores/controlOptions";
const pinia_settingStore = useControlOptionsStore();
</script>
<template>
  <n-list>
    <n-list-item>
      <div class="flex flex-row">
        <span class="mr-2">是否显示左上角版权控件</span>
        <n-switch
          :value="pinia_settingStore.isShowCopyright"
          @change="pinia_settingStore.switchShowCopyright"
        />
      </div>

      <template #suffix>
        <n-button
          class="mb-2"
          type="primary"
          @click="pinia_settingStore.createCopyright"
          >生成</n-button
        >
        <n-button type="warning" @click="pinia_settingStore.removeCopyright"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-row">
        <span class="mr-2">是否显示缩放控件</span>
        <n-switch
          :value="pinia_settingStore.isShowZoomControl"
          @change="pinia_settingStore.switchZoomControl"
        />
      </div>

      <template #suffix>
        <n-button
          class="mb-2"
          type="primary"
          @click="pinia_settingStore.createZoomControl"
          >生成</n-button
        >
        <n-button type="warning" @click="pinia_settingStore.removeZoomControl"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-row">
        <span class="mr-2">是否显示比例尺</span>
        <n-switch
          :value="pinia_settingStore.isShowScaleControl"
          @change="pinia_settingStore.switchScaleControl"
        />
      </div>

      <template #suffix>
        <n-button
          class="mb-2"
          type="primary"
          @click="pinia_settingStore.createScaleControl"
          >生成</n-button
        >
        <n-button type="warning" @click="pinia_settingStore.removeScaleControl"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-row">
        <span class="mr-2">是否显示鹰眼图</span>
        <n-switch
          :value="pinia_settingStore.isShowOverviewMap"
          @change="pinia_settingStore.switchOverviewMap"
        />
      </div>

      <template #suffix>
        <n-button
          class="mb-2"
          type="primary"
          @click="pinia_settingStore.createOverviewMap"
          >生成</n-button
        >
        <n-button type="warning" @click="pinia_settingStore.removeOverviewMap"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-row">
        <span class="mr-2">是否显示地图类型</span>
        <n-switch
          :value="pinia_settingStore.isShowMapTypeControl"
          @change="pinia_settingStore.switchMapTypeControl"
        />
      </div>

      <template #suffix>
        <n-button
          class="mb-2"
          type="primary"
          @click="pinia_settingStore.createMapTypeControl"
          >生成</n-button
        >
        <n-button
          type="warning"
          @click="pinia_settingStore.removeMapTypeControl"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-row">
        <span class="mr-2">是否显示符号标绘</span>
        <n-switch
          :value="pinia_settingStore.isShowMilitarySymbols"
          @change="pinia_settingStore.switchMilitarySymbols"
        />
      </div>

      <template #suffix>
        <n-button
          class="mb-2"
          type="primary"
          @click="pinia_settingStore.createMilitarySymbols"
          >生成</n-button
        >
        <n-button
          type="warning"
          @click="pinia_settingStore.removeMilitarySymbols"
          >销毁</n-button
        >
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped>
.setting-item-left {
  max-width: 240px;
}
</style>
