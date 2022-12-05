import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { citySearch } from "@/api/qweather";
import { debounce } from "@/utils/common";

export const useQweatherOptionsStore = defineStore("QweatherOptions", {
  state: () => ({
    // 和风天气免费的apikey，详见：
    apiKey: "",
    // 使用免费还是收费地址
    apiUrl: "https://devapi.qweather.com",
    // 城市搜索输入值
    citySearchValue: "",
    // 城市搜索完成后的结果
    citySearchRes: [],
  }),
  actions: {
    // 检查key是否填写
    checkInput() {
      if (!this.apiKey) {
        window.$message.warning("请填写key后再调用接口");
        throw new Error("请填写key后再调用接口");
      }
    },
    // 城市搜索
    api_citySearch: debounce(function (e) {
      // console.log(e);
      this.checkInput();
      citySearch({
        location: this.citySearchValue,
        number: 20,
      }).then((res) => {
        // console.log(res);
        this.citySearchRes = res.location.map((item) => {
          return {
            label: item.name,
            value: item
          };
        });
      });
    }),
    citySearchSelect(e) {
      console.log(e);
    },
  },
});
