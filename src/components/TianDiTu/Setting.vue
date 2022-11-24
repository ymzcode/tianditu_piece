<script setup>
import { onMounted, ref } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NSwitch,
  NDivider,
  NCollapse,
  NCollapseItem,
  NButton,
} from "naive-ui";
import { useSettingStore } from "@/stores/setting";

// 展示抽屉
const isShowModel = ref(false);

const pinia_settingStore = useSettingStore();
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
        <n-collapse :default-expanded-names="['1']">
          <n-collapse-item title="地图属性控制" name="1">
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
          </n-collapse-item>
          <n-collapse-item title="控件相关" name="2">
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
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.setting-item-left {
  max-width: 240px;
}
</style>
