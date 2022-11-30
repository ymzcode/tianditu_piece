<script setup>
import {
  NList,
  NListItem,
  NButton,
  NAlert,
  NSwitch,
  NSlider,
  NNumberAnimation,
  NIcon,
} from "naive-ui";
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
  pinia_useMarkerStore.initKindergarten(
    kindergartenUseLocalData.value,
    kindergartenDataSlider.value
  );
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
        <div class="mb-2 flex flex-row items-center">
          <n-icon size="20" color="#0e7a0d">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
            >
              <path d="M12 10h2v4h-2z" fill="currentColor"></path>
              <path d="M18 18h4v2h-4z" fill="currentColor"></path>
              <path d="M14 18v-2h-2v4h4v-2h-2z" fill="currentColor"></path>
              <path d="M16 4h12v12H16z" fill="currentColor"></path>
              <path
                d="M17.885 29.997l-6.066-3.855L4 27.989V4h10v4h-2V6H6v19.461l6.181-1.46l5.934 3.772L22.818 26H26v-6h-2v-2h4v10h-4.818l-5.297 1.997z"
                fill="currentColor"
              ></path>
            </svg>
          </n-icon>
          <span class="mx-2">海量点全国幼儿园数据 </span>
          <n-switch
            v-model:value="kindergartenUseLocalData"
            :round="false"
            :rail-style="railStyle"
          >
            <template #checked> 正在使用本地数据 </template>
            <template #unchecked> 正在使用线上数据 </template>
          </n-switch>
        </div>
        <div>
          设置渲染数据的数量级
          <n-number-animation :from="0" :to="kindergartenDataSlider" />
        </div>
        <n-slider
          v-model:value="kindergartenDataSlider"
          :min="10"
          :max="200000"
          :step="1"
        />
        <div class="mt-2">
          <n-alert class="mb-2" :show-icon="false">
            播放按钮可以实现幼儿园数据动态播放，播放时间间隔为3秒<br>
            播放时取值条件为固定：使用本地数据，起始点范围[10 - 180000]，步长范围[1000 - 3000]
          </n-alert>
          <n-button
            strong
            secondary
            round
            type="info"
            @click="pinia_useMarkerStore.playKindergartenData()"
          >
            播放
          </n-button>
          <n-button
            class="ml-2"
            strong
            secondary
            round
            type="info"
            @click="pinia_useMarkerStore.stopKindergartenData()"
          >
            停止
          </n-button>
        </div>
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
