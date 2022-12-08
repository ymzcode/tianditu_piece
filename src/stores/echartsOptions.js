import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";

export const useEchartsOptionsStore = defineStore("echartsOptions", {
  state: () => ({}),
  actions: {
    createPieChartDemo() {
      import("@/utils/echartsMap").then(({ echartsOverlay }) => {
        const options = {
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
                { value: 300, name: "Video Ads" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        const overlay = new echartsOverlay(
          new window.T.LngLat(116.40769, 39.89945),
          {
            width: 300,
            echartsOptions: options,
          }
        );
        const { addOverLay, Tmap } = useTiandituStore();
        addOverLay("echarts1", overlay);
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
      });
    },
    removePieChartDemo() {
      const { removeOverLay } = useTiandituStore();
      removeOverLay("echarts1");
    },
  },
});
