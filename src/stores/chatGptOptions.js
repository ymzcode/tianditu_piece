import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { getChatGpt } from "@/api/mapDataAPi";

export const useChatGptOptionsStore = defineStore("chatGptOptions", {
  state: () => ({
    // 文字输入内容
    msgText: "",
  }),
  actions: {
    sendChatGptMsg() {
      getChatGpt({
        msg: this.msgText,
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {

        } else {
          window.$message.error('oppos, 请求出现错误了！')
        }
      });
    },
  },
});
