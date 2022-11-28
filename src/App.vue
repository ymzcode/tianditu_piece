<script setup>
import { RouterView } from "vue-router";
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from "naive-ui";
import MessageApi from "@/components/MessageApi/MessageApi.vue";
import { version } from '@/config'
import LoadingBarApi from "@/components/LoadingBarApi/LoadingBarApi.vue";

console.log(`RUN VERSION : ${version}`)
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <message-api></message-api>
    </n-message-provider>
    <n-loading-bar-provider>
      <loading-bar-api></loading-bar-api>
    </n-loading-bar-provider>
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped></style>
