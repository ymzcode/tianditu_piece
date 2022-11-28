<script setup>
import { NList, NListItem, NButton } from 'naive-ui'
import { useMarkerStore } from "@/stores/markerOptions";

const pinia_useMarkerStore = useMarkerStore()
</script>

<template>
  <div class="flex flex-col">
    <n-list>
      <n-list-item>
        <div>幼儿园数据统计</div>
        <template #suffix>
          <n-button @click="pinia_useMarkerStore.initKindergarten()">生成数据</n-button>
        </template>
      </n-list-item>
      <n-list-item>
        1231231231
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped>

</style>
