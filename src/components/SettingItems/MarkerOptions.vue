<script setup>
import { NList, NListItem, NButton, NAlert, NSwitch, NSlider, NNumberAnimation } from "naive-ui";
import { useMarkerStore } from "@/stores/markerOptions";
import { ref } from "vue";

const pinia_useMarkerStore = useMarkerStore();

//  是否初始化中，强制一个等待时间
const isInitKindergarten = ref(false);
// 幼儿园数据是否使用线上
const kindergartenUseLocalData = ref(true);
// 幼儿园数据区间
const kindergartenDataSlider = ref(1000);
// 幼儿园点击生成数据按钮
const onClickInitKindergarten = () => {
  isInitKindergarten.value = true;
  setTimeout(() => {
    isInitKindergarten.value = false;
  }, 6000);
  pinia_useMarkerStore.initKindergarten(kindergartenUseLocalData.value, kindergartenDataSlider.value);
};

const railStyle = ({ focused, checked }) => {
  return checked ? { background: "#18a058" } : { background: "#d03050" };
};
</script>

<template>
  <div class="flex flex-col">
    <n-list>
      <!--      公告-->
      <n-list-item>
        <n-alert title="请先阅读一下注意事项" type="warning">
          1、全国幼儿园数据会有20万的数据量，虽然可以正常加载（可能游览器会卡住），但是很不合理。请根据自己的业务进行调整策略。
          <br />
          2、大部分接口默认都使用的是本地数据，当然也可以切换为使用线上数据。但是涉及线上都是有配额和支出费用的，个人开发不易，请合理使用资源。如果遇到线上接口错误，很大概率是接口调用次数用完了。</n-alert
        >
      </n-list-item>
      <!--      幼儿园数据-->
      <n-list-item>
        <div class="mb-2">
          全国幼儿园数据
          <n-switch
            v-model:value="kindergartenUseLocalData"
            :round="false"
            :rail-style="railStyle"
          >
            <template #checked> 正在使用本地数据 </template>
            <template #unchecked> 正在使用线上数据 </template>
          </n-switch>
        </div>
        <div>设置渲染数据的数量级
          <n-number-animation :from="0" :to="kindergartenDataSlider" />
        </div>
        <n-slider v-model:value="kindergartenDataSlider" :min="10" :max="200000" :step="1" />
        <template #suffix>
          <n-button
            type="info"
            @click="onClickInitKindergarten"
            :loading="isInitKindergarten"
            >生成</n-button
          >
          <n-button
              class="mt-2"
              type="warning"
              @click="pinia_useMarkerStore.removeKindergarten()"
          >销毁</n-button
          >
        </template>
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped></style>
