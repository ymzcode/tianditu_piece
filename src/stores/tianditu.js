import { defineStore } from "pinia";

export const useTiandituStore = defineStore("tianditu", {
  state: () => ({
    // 全局天地图组件视图对象
    Tmap: null,
    // 存储地图中所有添加的控件对象，方便后续的操作与管理
    mapControl: {},
  }),
  actions: {
    initTmap(Tmap) {
      if (this.Tmap) {
        console.log("天地图已经完成初始化，跳过初始化");
        return;
      }
      if (!Tmap) {
        console.error("Tmap传递为空");
        return;
      }
      this.Tmap = Tmap;
      console.log("天地图初始化成功");
      this.Tmap.centerAndZoom(new window.T.LngLat(116.40769, 39.89945), 12);
    },
    /*
     * 添加Control控件
     * id Control的唯一名称
     * control 创建的控件对象
     * */
    addControl(id, control) {
      if (!id || !control) {
        throw new Error(`addControl 参数不完整`);
      }
      // 检查是否已经存在
      if (this.mapControl[id]) {
        throw new Error(`当前存储的控件已经存在:${id}`);
      }
      this.mapControl[id] = control;
      this.Tmap.addControl(control);
    },
    /*
     * 销毁control控件
     * id Control的唯一名称
     * */
    removeControl(id) {
      if (!id) {
        throw new Error(`removeControl 参数不完整`);
      }
      // 检查是否不存在
      if (!this.mapControl[id]) {
        throw new Error(`当前销毁的控件不存在:${id}`);
      }
      this.Tmap.removeControl(this.mapControl[id]);
      delete this.mapControl[id];
    },
  },
});
