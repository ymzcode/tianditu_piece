import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  // 处理错误，例如：报告给一个服务
  // console.log(err.toString())
  window.$message.error(err.toString());
};

app.use(createPinia());
app.use(router);

app.mount("#app");
