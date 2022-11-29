<script setup>
import { RouterView } from "vue-router";
import {
  NMessageProvider,
  NConfigProvider,
  NLoadingBarProvider,
  NNotificationProvider,
} from "naive-ui";
import MessageApi from "@/components/MessageApi/MessageApi.vue";
import { version } from "@/config";
import LoadingBarApi from "@/components/LoadingBarApi/LoadingBarApi.vue";
import NotificationApi from "@/components/NotificationApi/NotificationApi.vue";

console.log(`RUN VERSION : ${version}`);
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <message-api></message-api>
    </n-message-provider>
    <n-loading-bar-provider>
      <loading-bar-api></loading-bar-api>
    </n-loading-bar-provider>
    <n-notification-provider>
      <notification-api></notification-api>
    </n-notification-provider>
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped></style>
