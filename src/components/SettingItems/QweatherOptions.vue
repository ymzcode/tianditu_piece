<script setup>
import { h, onMounted } from "vue";
import {
  NInput,
  NDivider,
  NRadioGroup,
  NRadio,
  NAutoComplete,
  NTag,
  NList,
  NListItem,
  NAlert,
  NButton,
  NTooltip,
  NSwitch,
} from "naive-ui";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";
const pinia_useQweatherOptionsStore = useQweatherOptionsStore();

const city_renderLabel = (option) => [
  `${option.value.adm1} - ${option.value.adm2}`,
  ` - ${option.label} `,
  h(
    NTag,
    { size: "small", type: "info", bordered: false },
    { default: () => `${option.value.lat},${option.value.lon}` }
  ),
];

onMounted(() => {
  loadKey();
});

const saveKey = () => {
  window.localStorage.setItem("HF_KEY", pinia_useQweatherOptionsStore.apiKey);
  window.$message.success("保存和风天气key成功");
};

const removeKey = () => {
  window.localStorage.removeItem("HF_KEY");
  pinia_useQweatherOptionsStore.apiKey = "";
  window.$message.success("删除和风天气key成功");
};

const loadKey = () => {
  const key = window.localStorage.getItem("HF_KEY");
  pinia_useQweatherOptionsStore.apiKey = key;
};
</script>
<template>
  <n-list>
    <!--      公告-->
    <n-list-item>
      <n-alert title="注意事项" type="warning">
        1. 使用和风天气接口需要先填写api key，详见：<a
          href="https://dev.qweather.com/docs/configuration/project-and-key/"
          >项目和KEY</a
        >， 根据申请的类型切换免费或者付费订阅
        <br />
        2. 保存key逻辑为local storage，不会涉及网络传输
      </n-alert>
    </n-list-item>
    <!--    和风天气key，url接口地址-->
    <n-list-item>
      <div class="flex flex-col">
        <div>和风天气api key</div>
        <n-input
          class="my-2"
          v-model:value="pinia_useQweatherOptionsStore.apiKey"
          type="text"
          placeholder="KEY是获取和风天气开发服务的密钥"
        />
        <div>
          <n-button @click="saveKey">保存</n-button>
          <n-button class="ml-2" @click="removeKey">清除</n-button>
        </div>
      </div>
      <template #suffix>
        <n-radio-group
          class="w-24"
          v-model:value="pinia_useQweatherOptionsStore.apiUrl"
          name="apiUrl"
        >
          <n-radio value="https://devapi.qweather.com"> 免费订阅 </n-radio>
          <n-radio value="https://api.qweather.com"> 标准订阅 </n-radio>
        </n-radio-group>
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-col">
        <div class="mb-2">城市搜索</div>
        <n-auto-complete
          v-model:value="pinia_useQweatherOptionsStore.citySearchValue"
          :input-props="{
            autocomplete: 'disabled',
          }"
          :render-label="city_renderLabel"
          :options="pinia_useQweatherOptionsStore.citySearchRes"
          placeholder="输入搜索的地名"
          @update-value="pinia_useQweatherOptionsStore.api_citySearch"
          @select="pinia_useQweatherOptionsStore.citySearchSelect"
        />
      </div>
      <template #suffix>
        <n-button
          type="warning"
          @click="pinia_useQweatherOptionsStore.removeCitySearch"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-col">
        <div class="mb-2">空气质量监测站</div>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              type="info"
              @click="pinia_useQweatherOptionsStore.loadNationalStation"
              >加载全国站点</n-button
            >
          </template>
          加载项为全国空气质量监测站静态数据，点击某个站点才会调用接口
        </n-tooltip>
      </div>
      <template #suffix>
        <n-button
          type="warning"
          @click="pinia_useQweatherOptionsStore.removeNationalStation"
          >销毁</n-button
        >
      </template>
    </n-list-item>

    <n-list-item>
      <div class="flex flex-col">
        <div class="mb-2">天气混合展示</div>
        <div class="text-gray-500 mb-2">
          提示：使用需先注册拾点器，然后点击地图任意位置，根据左侧开关开启状态获取相应信息
        </div>
        <div class="flex flex-row">
          <span class="mr-2">实时天气</span>
          <n-switch
            v-model:value="
              pinia_useQweatherOptionsStore.mixedWeatherSwitch.weatherNow
            "
          />
        </div>
        <div class="flex flex-row my-2">
          <span class="mr-2">7日天气预报</span>
          <n-switch
            v-model:value="
              pinia_useQweatherOptionsStore.mixedWeatherSwitch.weather7d
            "
          />
        </div>
        <div class="flex flex-row">
          <span class="mr-2">24小时天气预报</span>
          <n-switch
            v-model:value="
              pinia_useQweatherOptionsStore.mixedWeatherSwitch.weather24h
            "
          />
        </div>
        <div class="flex flex-row my-2">
          <span class="mr-2">分钟级降水预报</span>
          <n-switch
            v-model:value="
              pinia_useQweatherOptionsStore.mixedWeatherSwitch.minutely5m
            "
          />
        </div>
        <div class="flex flex-row">
          <span class="mr-2">天气指数预报</span>
          <n-switch
            v-model:value="
              pinia_useQweatherOptionsStore.mixedWeatherSwitch.indices1d
            "
          />
        </div>
      </div>
      <template #suffix>
        <n-button
          type="info"
          @click="
            pinia_useQweatherOptionsStore.createMixedWeatherCoordinatePickup
          "
          >注册拾点器</n-button
        >
        <n-button
          class="mt-2"
          type="warning"
          @click="
            pinia_useQweatherOptionsStore.removeMixedWeatherCoordinatePickup
          "
          >销毁</n-button
        >
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
