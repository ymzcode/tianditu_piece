import { defineStore } from "pinia";
import { useTiandituStore } from "@/stores/tianditu";
import { useControlOptionsStore } from "@/stores/controlOptions";

export const useSettingStore = defineStore("setting", {
  state: () => ({}),
  actions: {
    /*
     * 初始化设置*/
    initSetting() {
      const { mapControl } = useTiandituStore();
      const {
        createCopyright,
        createZoomControl,
        createScaleControl,
        createOverviewMap,
        createMapTypeControl,
        createMilitarySymbols,
      } = useControlOptionsStore();
      createCopyright();
      createZoomControl();
      createScaleControl();
      createOverviewMap();
      createMapTypeControl();
      createMilitarySymbols();
      window.$mapControl = mapControl;
    },
  },
});
