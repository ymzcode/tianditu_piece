import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { demoOption } from "@/assets/echarts/demoOption";

export const useEchartsOptionsStore = defineStore("echartsOptions", {
  state: () => ({
    inputOption:
      "{\n" +
      "  tooltip: {\n" +
      "    trigger: 'item'\n" +
      "  },\n" +
      "  series: [\n" +
      "    {\n" +
      "      name: 'Access From',\n" +
      "      type: 'pie',\n" +
      "      radius: ['40%', '70%'],\n" +
      "      avoidLabelOverlap: false,\n" +
      "      label: {\n" +
      "        show: false,\n" +
      "        position: 'center'\n" +
      "      },\n" +
      "      emphasis: {\n" +
      "        label: {\n" +
      "          show: true,\n" +
      "          fontSize: '40',\n" +
      "          fontWeight: 'bold'\n" +
      "        }\n" +
      "      },\n" +
      "      labelLine: {\n" +
      "        show: false\n" +
      "      },\n" +
      "      data: [\n" +
      "        { value: 1048, name: 'Search Engine' },\n" +
      "        { value: 735, name: 'Direct' },\n" +
      "        { value: 580, name: 'Email' },\n" +
      "        { value: 484, name: 'Union Ads' },\n" +
      "        { value: 300, name: 'Video Ads' }\n" +
      "      ]\n" +
      "    }\n" +
      "  ]\n" +
      "}",
    customEchartsLnglat: [],
    tmapEchartsOpt: "",
  }),
  actions: {
    /*
     * 创建饼图示例
     * */
    createPieChartDemo() {
      import("@/utils/echartsMap").then(({ echartsOverlay }) => {
        const _option = demoOption.pieSimple();
        const overlay = new echartsOverlay(
          new window.T.LngLat(116.40769, 39.89945),
          {
            width: 300,
            echartsOptions: _option,
            updateCallBack: (chartView, map) => {
              console.log(chartView, map);
              console.log(map.getZoom());
              console.log(chartView.getDom());
              console.log(this);
            },
          }
        );
        this.addEcharts("echarts1", overlay);
      });
    },
    addEcharts(id, overlay) {
      const { addOverLay, Tmap } = useTiandituStore();
      addOverLay(id, overlay);
      const myChart = overlay.getChart();
      myChart.on("mouseover", function (params) {
        Tmap.disableDrag();
        Tmap.disableScrollWheelZoom();
        Tmap.disableDoubleClickZoom();
      });
      myChart.on("mouseout", function (params) {
        Tmap.enableDrag();
        Tmap.enableScrollWheelZoom();
        Tmap.enableDoubleClickZoom();
      });
    },
    removePieChartDemo() {
      const { removeOverLay } = useTiandituStore();
      removeOverLay("echarts1");
    },
    createCustomEcharts() {
      if (!this.customEchartsLnglat[0] || !this.customEchartsLnglat[1]) {
        return window.$message.warning("请指定放置图表的坐标");
      }
      if (!this.inputOption) {
        return window.$message.warning("请填入图表配置项");
      }
      const _option = new Function("return " + this.inputOption)();
      console.log(_option);
      import("@/utils/echartsMap").then(({ echartsOverlay }) => {
        const lnglat = new window.T.LngLat(
          this.customEchartsLnglat[0],
          this.customEchartsLnglat[1]
        );
        const overlay = new echartsOverlay(lnglat, {
          width: 300,
          echartsOptions: _option,
        });
        this.addEcharts("echartsCustom", overlay);
      });
    },
    removeCustomEcharts() {
      const { removeOverLay } = useTiandituStore();
      removeOverLay("echartsCustom");
    },
    /*
     * 创建散点图示例
     * */
    createScatterColor() {
      import("@/utils/echartsMap").then(({ echartsOverlay }) => {
        const _option = demoOption.scatterAqiColor();
        const overlay = new echartsOverlay(
          new window.T.LngLat(116.40769, 39.89945),
          {
            width: 500,
            height: 500,
            echartsOptions: _option,
          }
        );
        this.addEcharts("echarts1", overlay);
      });
    },
  },
});
