<script setup>
import { RouterView } from "vue-router";
import { NMessageProvider, NConfigProvider } from "naive-ui";
import MessageApi from "@/components/MessageApi/MessageApi.vue";
import { version } from '@/config'

console.log(`RUN VERSION : ${version}`)
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <message-api></message-api>
    </n-message-provider>
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped></style>
