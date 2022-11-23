<script setup>
import { ref } from "vue";
import TianDiTu from "@/components/TianDiTu/TianDiTu.vue";
import Setting from "@/components/TianDiTu/Setting.vue"
</script>

<template>
  <main>
    <div class="absolute w-full h-full ">
      <tian-di-tu></tian-di-tu>
      <setting></setting>
    </div>
  </main>
</template>
