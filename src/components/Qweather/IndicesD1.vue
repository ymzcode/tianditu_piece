<script setup>
import { computed, onMounted, ref } from "vue";
import { NSkeleton, NTimeline, NTimelineItem } from "naive-ui";
import { indices1d } from "@/api/qweather";

const show = ref(false);

const indices1dData = ref([]);

const props = defineProps({
  location: String,
});

onMounted(() => {
  indices1d({
    location: props.location,
    type: 0,
  }).then((res) => {
    // console.log(res);
    indices1dData.value = res.daily;
    show.value = true;
  });
});
</script>

<template>
  <n-skeleton v-if="!show" text :repeat="2" />
  <div v-else class="flex flex-col">
    <n-timeline>
      <n-timeline-item
        v-for="item in indices1dData"
        :key="`${item.name}${item.date}`"
        type="success"
        :time="item.date"
      >
        <template #header> {{ item.name }} ：{{ item.date }} </template>
        <div>指数预报：{{ item.category }}</div>
        <div>详细描述 ：{{ item.text }}</div>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<style scoped></style>
