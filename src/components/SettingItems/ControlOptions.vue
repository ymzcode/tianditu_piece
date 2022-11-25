<script setup>
import { NSwitch, NDivider, NButton } from "naive-ui";

import { useSettingStore } from "@/stores/setting";
const pinia_settingStore = useSettingStore();
</script>
<template>
  <!--        变量说明-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">当前已经将所有控件挂载</div>
      <div class="text-xs text-gray-500">
        你可以在控制台使用例如：window.$mapControl['scaleControl'].setColor('blue')
        来改变比例尺的颜色。
      </div>
    </div>
    <div>window.$mapControl</div>
  </div>
  <n-divider />
  <!--        是否显示左上角版权控件-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">是否显示左上角版权控件</div>
      <div class="text-xs text-gray-500">
        当前开关控制的是显隐，并不是销毁控件
      </div>
    </div>
    <div>
      <n-switch
        :value="pinia_settingStore.isShowCopyright"
        @click="pinia_settingStore.switchShowCopyright()"
      />
      <n-button
        class="ml-2"
        type="primary"
        @click="pinia_settingStore.createCopyright()"
        >生成</n-button
      >
      <n-button
        class="ml-2"
        type="warning"
        @click="pinia_settingStore.removeCopyright()"
        >销毁</n-button
      >
    </div>
  </div>
  <n-divider />
  <!--        是否显示缩放控件-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">是否显示缩放控件</div>
      <div class="text-xs text-gray-500">
        当前开关控制的是显隐，并不是销毁控件
      </div>
    </div>
    <div>
      <n-switch
        :value="pinia_settingStore.isShowZoomControl"
        @click="pinia_settingStore.switchZoomControl()"
      />
      <n-button
        class="ml-2"
        type="primary"
        @click="pinia_settingStore.createZoomControl()"
        >生成</n-button
      >
      <n-button
        class="ml-2"
        type="warning"
        @click="pinia_settingStore.removeZoomControl()"
        >销毁</n-button
      >
    </div>
  </div>
  <n-divider />
  <!--        是否显示比例尺-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">是否显示比例尺</div>
      <div class="text-xs text-gray-500">
        当前开关控制的是显隐，并不是销毁控件
      </div>
    </div>
    <div>
      <n-switch
        :value="pinia_settingStore.isShowScaleControl"
        @click="pinia_settingStore.switchScaleControl()"
      />
      <n-button
        class="ml-2"
        type="primary"
        @click="pinia_settingStore.createScaleControl()"
        >生成</n-button
      >
      <n-button
        class="ml-2"
        type="warning"
        @click="pinia_settingStore.removeScaleControl()"
        >销毁</n-button
      >
    </div>
  </div>
  <n-divider />
  <!--        是否显示鹰眼图-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">是否显示鹰眼图</div>
      <div class="text-xs text-gray-500">
        当前开关控制的是显隐，并不是销毁控件
      </div>
    </div>
    <div>
      <n-switch
        :value="pinia_settingStore.isShowOverviewMap"
        @click="pinia_settingStore.switchOverviewMap()"
      />
      <n-button
        class="ml-2"
        type="primary"
        @click="pinia_settingStore.createOverviewMap()"
        >生成</n-button
      >
      <n-button
        class="ml-2"
        type="warning"
        @click="pinia_settingStore.removeOverviewMap()"
        >销毁</n-button
      >
    </div>
  </div>
  <n-divider />
  <!--        是否显示地图类型-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">是否显示地图类型</div>
      <div class="text-xs text-gray-500">
        当前开关控制的是显隐，并不是销毁控件
      </div>
    </div>
    <div>
      <n-switch
        :value="pinia_settingStore.isShowMapTypeControl"
        @click="pinia_settingStore.switchMapTypeControl()"
      />
      <n-button
        class="ml-2"
        type="primary"
        @click="pinia_settingStore.createMapTypeControl()"
        >生成</n-button
      >
      <n-button
        class="ml-2"
        type="warning"
        @click="pinia_settingStore.removeMapTypeControl()"
        >销毁</n-button
      >
    </div>
  </div>
  <n-divider />
  <!--        是否显示符号标绘-->
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col setting-item-left">
      <div class="item-title">是否显示符号标绘</div>
      <div class="text-xs text-gray-500">
        当前开关控制的是显隐，并不是销毁控件
      </div>
    </div>
    <div>
      <n-switch
        :value="pinia_settingStore.isShowMilitarySymbols"
        @click="pinia_settingStore.switchMilitarySymbols()"
      />
      <n-button
        class="ml-2"
        type="primary"
        @click="pinia_settingStore.createMilitarySymbols()"
        >生成</n-button
      >
      <n-button
        class="ml-2"
        type="warning"
        @click="pinia_settingStore.removeMilitarySymbols()"
        >销毁</n-button
      >
    </div>
  </div>
  <n-divider />
</template>

<style scoped>
.setting-item-left {
  max-width: 240px;
}
</style>
