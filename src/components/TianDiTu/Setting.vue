<script setup>
import { onMounted, ref } from "vue";
import { NDrawer, NDrawerContent, NCollapse, NCollapseItem } from "naive-ui";
import { useSettingStore } from "@/stores/setting";
import ControlOptions from "@/components/SettingItems/ControlOptions.vue";
import MapOptions from "@/components/SettingItems/MapOptions.vue";
import MarkerOptions from "@/components/SettingItems/MarkerOptions.vue";

// 展示抽屉
const isShowModel = ref(false);

const pinia_settingStore = useSettingStore();
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
        </n-collapse>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
