<script setup>
import { NList, NListItem, NInput, NButton } from "naive-ui";
import { useChatGptOptionsStore } from "@/stores/chatGptOptions";

const pinia_useChatGptOptionsStore = useChatGptOptionsStore();
</script>

<template>
  <n-list>
    <n-list-item>
      <div class="flex flex-col">
        <n-input
          v-model:value="pinia_useChatGptOptionsStore.msgText"
          type="textarea"
          :autosize="{
            minRows: 3,
          }"
          placeholder="试试看chatGpt能做什么"
        />
        <n-button
          class="mt-2"
          type="primary"
          @click="pinia_useChatGptOptionsStore.sendChatGptMsg"
          >发送</n-button
        >
      </div>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
