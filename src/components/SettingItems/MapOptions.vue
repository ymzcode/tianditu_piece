<script setup>
import { NSwitch, NDivider, NList, NListItem, NButton } from "naive-ui";
import { useMapOptionsStore } from "@/stores/mapOptions";
const pinia_settingStore = useMapOptionsStore();
</script>

<template>
  <n-list>
    <n-list-item>
      <div class="item-title">是否启用地图拖拽</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isEnableDrag"
          @change="pinia_settingStore.switchEnableDrag"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用滚轮放大缩小</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isScrollWheelZoom"
          @change="pinia_settingStore.switchScrollWheelZoom"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用双击放大</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isDoubleClickZoom"
          @change="pinia_settingStore.switchDoubleClickZoom"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用键盘操作</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isKeyboard"
          @change="pinia_settingStore.switchKeyboard"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用惯性拖拽</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isInertia"
          @change="pinia_settingStore.switchInertia"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用自动适应容器尺寸</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isContinuousZoom"
          @click="pinia_settingStore.switchContinuousZoom"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用双指缩放</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isPinchToZoom"
          @click="pinia_settingStore.switchPinchToZoom"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="item-title">是否启用连续缩放</div>
      <template #suffix>
        <n-switch
          :value="pinia_settingStore.isAutoResize"
          @click="pinia_settingStore.switchAutoResize"
        />
      </template>
    </n-list-item>
    <n-list-item>
      <div class="mb-2">手动切换地图类型</div>
      <n-button
        ghost
        @click="pinia_settingStore.setTMapType('TMAP_NORMAL_MAP')"
      >
        地图
      </n-button>
      <n-button
        class="mx-2"
        ghost
        @click="pinia_settingStore.setTMapType('TMAP_SATELLITE_MAP')"
      >
        卫星
      </n-button>
      <n-button
        ghost
        @click="pinia_settingStore.setTMapType('TMAP_HYBRID_MAP')"
      >
        卫星混合
      </n-button>
      <n-button
        class="mx-2"
        ghost
        @click="pinia_settingStore.setTMapType('TMAP_TERRAIN_MAP')"
      >
        地形
      </n-button>
      <n-button
        ghost
        @click="pinia_settingStore.setTMapType('TMAP_TERRAIN_HYBRID_MAP')"
      >
        地形混合
      </n-button>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
