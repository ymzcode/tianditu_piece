import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { getChatGpt } from "@/api/mapDataAPi";
import { useControlOptionsStore } from "@/stores/controlOptions";

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
          this.matchKeywordsChatGpt(choices[0].text);
        } else {
          window.$message.error("oops, 请求出现错误了！");
        }
      });
    },
    /*
     * 保存用户的聊天记录
     * */
    saveUserHistoryText(text) {
      this.userHistoryTextArr.push({
        time: Date.now(),
        text: "\n" + text + "\n",
        role: "user",
      });
      this.msgText = "";
    },
    /*
     * 保存Gpt的聊天记录
     * */
    saveChatGptHistoryText(textObj) {
      const length = this.chatGptHistoryTextArr.length;
      // 如果上一个不是stop结束
      if (
        length > 0 &&
        this.chatGptHistoryTextArr[length - 1].finish_reason === "length"
      ) {
        // 拼接未完成的语句
        this.chatGptHistoryTextArr[length - 1].text += textObj.text;
        // 判断当前textObj是否是stop
        if (textObj.finish_reason === "stop") {
          // 将当前状态改为结束
          this.chatGptHistoryTextArr[length - 1].finish_reason = "stop";
        }
      } else {
        this.chatGptHistoryTextArr.push(textObj);
      }
    },
    /*
     * 清空聊天记录
     * */
    clearHistoryText() {
      this.chatGptHistoryTextArr = [];
      this.userHistoryTextArr = [];
    },
    /*
     * 通过ai返回的code关键词，调用相应的方法
     * */
    matchKeywordsChatGpt(text) {
      const { createCopyright, removeCopyright, switchShowCopyright } =
        useControlOptionsStore();
      // 定义code数据集合
      const arr = [
        { text: "生成版权控件", code: "createCopyright", fun: createCopyright },
        { text: "销毁版权控件", code: "removeCopyright", fun: removeCopyright },
        {
          text: "开关版权控件",
          code: "switchShowCopyright",
          fun: switchShowCopyright,
        },
      ];
      arr.map((item) => {
        if (text.indexOf(item.code) > -1) {
          item.fun();
        }
      });
    },
  },
});
