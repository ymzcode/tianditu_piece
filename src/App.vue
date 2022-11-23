<script setup>
import { RouterView } from "vue-router";
import { NMessageProvider } from 'naive-ui'

</script>

<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<style scoped></style>
