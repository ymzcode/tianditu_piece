import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { getChatGpt } from "@/api/mapDataAPi";

export const useChatGptOptionsStore = defineStore("chatGptOptions", {
  state: () => ({
    // 文字输入内容
    msgText: "",
    /*
     * 机器人的历史回答
     *
     *
     * */
    chatGptHistoryTextArr: [],
    /*
     * 用户的历史输入
     * */
    userHistoryTextArr: [],
    // 请求接口
    isGetChatGptLoading: false,
  }),
  actions: {
    sendChatGptMsg() {
      this.msgText && this.saveUserHistoryText(this.msgText);
      const textArr = [];
      this.userHistoryTextArr.map((item, index) => {
        textArr.push(item);
        this.chatGptHistoryTextArr[index] &&
          textArr.push(this.chatGptHistoryTextArr[index]);
      });
      let allMsg = "";
      textArr.map((item) => {
        allMsg += item.text;
      });
      this.isGetChatGptLoading = true;
      getChatGpt({
        msg: allMsg,
      }).then((res) => {
        console.log(res);
        this.isGetChatGptLoading = false;
        if (res.status === 200) {
          const { choices } = res.data;
          this.saveChatGptHistoryText(choices[0]);
          if (choices[0].finish_reason === "length") {
            this.sendChatGptMsg();
            console.log("接着请求");
          }
        } else {
          window.$message.error("oops, 请求出现错误了！");
        }
      });
    },
    saveUserHistoryText(text) {
      this.userHistoryTextArr.push({
        time: Date.now(),
        text: "\n" + text + "\n",
        role: "user",
      });
      this.msgText = "";
    },
    saveChatGptHistoryText(textObj) {
      const length = this.chatGptHistoryTextArr.length;
      if (textObj.finish_reason !== "stop" && length > 0) {
        this.chatGptHistoryTextArr[length - 1].finish_reason === "stop"
          ? this.chatGptHistoryTextArr.push(textObj)
          : (this.chatGptHistoryTextArr[length - 1].text += textObj.text);
      } else {
        this.chatGptHistoryTextArr.push(textObj);
      }
    },
  },
});
