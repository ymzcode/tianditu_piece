<template>
  <n-list>
    <n-list-item>
      <div>
        <n-button @click="pinia_useEldenRingOptionsStore.initEldenRingMap"
          >加载地图</n-button
        >
      </div>
    </n-list-item>
  </n-list>
</template>

<script setup>
import { NList, NListItem, NButton } from "naive-ui";
import { useEldenRingOptionsStore } from "@/stores/eldenRingoptions";
const pinia_useEldenRingOptionsStore = useEldenRingOptionsStore();
</script>

<style scoped></style>
