<script setup>
import TianDiTu from "@/components/TianDiTu/TianDiTu.vue";
import Setting from "@/components/TianDiTu/Setting.vue";

createListener();

/*
 * 注册监听报错的函数
 * */
function createListener() {
  window.addEventListener("error", (message) => {
    // console.log(message)
    window.$message.error(message.error.toString());
  });
}
</script>

<template>
  <main>
    <div class="absolute w-full h-full">
      <tian-di-tu></tian-di-tu>
      <setting></setting>
    </div>
  </main>
</template>
