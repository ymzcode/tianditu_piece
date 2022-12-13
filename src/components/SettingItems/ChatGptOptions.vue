<script setup>
import {
  NList,
  NListItem,
  NInput,
  NButton,
  NEmpty,
  NSkeleton,
  NSpin,
  NIcon,
  NPopover,
} from "naive-ui";
import { useChatGptOptionsStore } from "@/stores/chatGptOptions";
import { computed } from "vue";

const pinia_useChatGptOptionsStore = useChatGptOptionsStore();

// 混排合并历史记录
const historyChatArr = computed(() => {
  const { userHistoryTextArr, chatGptHistoryTextArr } =
    pinia_useChatGptOptionsStore;
  const catchArr = [];
  userHistoryTextArr.map((item, index) => {
    catchArr.push(item);
    chatGptHistoryTextArr[index] && catchArr.push(chatGptHistoryTextArr[index]);
  });
  return catchArr;
});
</script>

<template>
  <n-list>
    <n-list-item>
      <div class="mb-8 p-10 bg-gray-600 relative rounded-lg">
        <n-popover trigger="hover">
          <template #trigger>
            <n-button
              @click="pinia_useChatGptOptionsStore.clearHistoryText"
              class="absolute right-3 top-3"
              quaternary
              circle
            >
              <template #icon>
                <n-icon
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                      fill="currentColor"
                    ></path></svg
                ></n-icon>
              </template>
            </n-button>
          </template>
          <span>清空聊天记录，重置上下文关系</span>
        </n-popover>

        <n-empty
          v-if="pinia_useChatGptOptionsStore.userHistoryTextArr.length === 0"
          description="还没有聊天记录"
        >
        </n-empty>
        <div class="flex flex-col">
          <div
            class="text-white"
            v-for="(item, index) in historyChatArr"
            :key="item.text + index"
          >
            <span v-if="item.role === 'user'">你说：</span> {{ item.text }}
          </div>
          <div
            v-if="pinia_useChatGptOptionsStore.isGetChatGptLoading"
            class="flex flex-row items-center"
          >
            <span class="text-white mr-2">思考中···</span>
            <n-spin stroke="#fff" size="small" />
          </div>
        </div>
      </div>
      <div class="flex flex-col relative">
        <n-input
          v-model:value="pinia_useChatGptOptionsStore.msgText"
          type="textarea"
          :autosize="{
            minRows: 1,
          }"
          placeholder="试试看chatGpt能做什么"
        />
        <n-button
          :loading="pinia_useChatGptOptionsStore.isGetChatGptLoading"
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
