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
  NAlert,
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
      <n-alert title="注意事项" type="warning">
        1. chatGpt是一个可以应用于任何涉及理解或生成自然语言或代码的AI，详见<a
          href="https://beta.openai.com/docs/introduction"
          target="_blank"
          >OpenAI</a
        >
        <br />
        2.
        本功能调用模型text-davinci-003，为实验功能，可以实现简单的调用地图中的方法。
        <br />
        3.
        由于openai本身为收费api，目前还在公测后期可能采用某种限制，本功能为实验性质，后续版本随时会移除。
        <br />
        4.
        目前只对版权控件进行了简单控制，包含生成版权控件、销毁版权控件、开关版权控件。例如发送：帮我销毁版权控件
      </n-alert>
    </n-list-item>
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
            <span v-if="item.role === 'user'">
              <n-icon
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    fill="currentColor"
                  ></path></svg
              ></n-icon>
              ：</span
            >
            <span v-else class="mr-9"></span>
            {{ item.text }}
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
