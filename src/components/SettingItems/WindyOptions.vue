<template>
  <n-list>
    <n-list-item>
      <div>
        <div class="my-2">设置模型（model）</div>
        <n-select v-model:value="model" :consistent-menu-width="false" :options="modelOptions" />
      </div>

      <div>
        <div class="my-2">设置级别（levels）</div>
        <n-select
          multiple
          clearable
          v-model:value="levels"
          :options="levelsOptions"
        />
      </div>

      <div>
        <div class="my-2">设置数据项（parameters）</div>
        <n-select
          multiple
          clearable
          v-model:value="parameters"
          :options="parametersOptions"
        />
      </div>
    </n-list-item>
  </n-list>
</template>

<script setup>
import { NList, NListItem, NButton, NSpace, NSelect } from "naive-ui";
import { ref } from "vue";

/*
 * 模型
 * */
const model = ref("GFS");
const modelOptions = ref([
  { label: "覆盖法国及周边地区", value: "Arome" },
  { label: "覆盖欧洲及周边地区", value: "IconEU" },
  { label: "全球模型-GFS", value: "GFS" },
  {
    label:
      "一个全球模型，不包括哈德逊湾（部分）、黑海、里海和北冰洋的大部分地区。",
    value: "GFS Wave",
  },
  { label: "覆盖美国及周边地区（加拿大、墨西哥）", value: "namConus" },
  { label: "涵盖夏威夷", value: "namHawaii" },
  { label: "涵盖阿拉斯加及周边地区。", value: "namAlaska" },
  { label: "全球模型-geos5", value: "geos5" },
]);

/*
 * 级别
 * */
const levels = ref(["surface"]);
const levelsOptions = ref([
  { label: "surface", value: "surface" },
  { label: "1000h", value: "1000h" },
  { label: "950h", value: "950h" },
  { label: "925h", value: "925h" },
  { label: "900h", value: "900h" },
  { label: "850h", value: "850h" },
  { label: "800h", value: "800h" },
  { label: "700h", value: "700h" },
  { label: "600h", value: "600h" },
  { label: "500h", value: "500h" },
  { label: "400h", value: "400h" },
  { label: "300h", value: "300h" },
  { label: "150h", value: "150h" },
]);

/*
 * 数据项
 * */
const parameters = ref([]);
const parametersOptions = ref([
  { label: "气温", value: "temp" },
  { label: "露点温度，即空气达到 100% 湿度的温度", value: "dewpoint" },
  { label: "前 3 小时所有降水（水柱）的总累积量，包括 snowPrecip 和 convPrecip", value: "precip" },
  { label: "前 3 小时的总降雪量（水柱）", value: "snowPrecip" },
  { label: "前3小时由对流（水柱）引起的降水总量", value: "convPrecip" },
  { label: "由二维向量定义的风速和风向。 分量 u 定义了从西向东吹的风速（负值因此意味着相反的方向）。 分量 v 类似地定义了从南风吹向北风的速度", value: "wind" },
  { label: "阵风时的风速", value: "windGust" },
  { label: "对流可用势能", value: "cape" },
  { label: "降水型", value: "ptype" },
  { label: "气压高于 800hPa 的低云层。该值描述了整体云覆盖", value: "lclouds" },
  { label: "400h", value: "mclouds" },
  { label: "300h", value: "hclouds" },
  { label: "150h", value: "rh" },
  { label: "150h", value: "gh" },
  { label: "150h", value: "pressure" },
  { label: "150h", value: "waves" },
  { label: "150h", value: "windWaves" },
  { label: "150h", value: "swell1" },
  { label: "150h", value: "swell2" },
  { label: "150h", value: "so2sm" },
  { label: "150h", value: "dustsm" },
  { label: "150h", value: "cosc" },
]);
</script>

<style scoped></style>
