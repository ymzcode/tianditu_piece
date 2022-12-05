<script setup>
import { NInput, NDivider, NRadioGroup, NRadio, NAutoComplete } from "naive-ui";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";
const pinia_useQweatherOptionsStore = useQweatherOptionsStore();
</script>
<template>
  <div class="flex flex-col">
    <div>和风天气api key</div>
    <n-input
      class="my-2"
      v-model:value="pinia_useQweatherOptionsStore.apiKey"
      type="text"
      placeholder="KEY是获取和风天气开发服务的密钥"
    />
    <n-radio-group
      v-model:value="pinia_useQweatherOptionsStore.apiUrl"
      name="apiUrl"
    >
      <n-radio value="https://devapi.qweather.com"> 免费订阅 </n-radio>
      <n-radio value="https://api.qweather.com"> 标准订阅 </n-radio>
    </n-radio-group>
  </div>
  <n-divider />
  <div class="flex flex-col">
    <div>城市搜索</div>
    <n-auto-complete
      v-model:value="pinia_useQweatherOptionsStore.citySearchValue"
      :input-props="{
        autocomplete: 'disabled',
      }"
      :options="pinia_useQweatherOptionsStore.citySearchRes"
      placeholder="输入搜索的地名"
      @update-value="pinia_useQweatherOptionsStore.api_citySearch"
    />
  </div>
</template>

<style scoped></style>
