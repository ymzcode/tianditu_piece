<script setup>
import { h } from "vue";
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
</script>
<template>
  <n-list>
    <!--      公告-->
    <n-list-item>
      <n-alert title="注意事项" type="warning">
        <br />
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
        <div>城市搜索</div>
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
        <n-button class="mt-2" type="warning">销毁</n-button>
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
