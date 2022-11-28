import { defineStore } from "pinia";
import { isShowErrorMessage } from "@/config";

export const useTiandituStore = defineStore("tianditu", {
  state: () => ({
    // 全局天地图组件视图对象
    Tmap: null,
    /*
     * 存储地图中所有添加的控件对象，方便后续的操作与管理
     *
     * 以key为id，value作为存储的控件对象，其结果存储格式为
     * { 'github': 对象体, ~~~~~ }*/
    mapControl: {},
    /*
     * 这里你也可以使用getOverlays，去管理地图中所有的覆盖物，
     * 但是相比每次调用，如果严格按照自己的增删方法去操作覆盖物，管理起来会更清晰。
     *
     * 存储地图中所有手动操作的覆盖物对象，请严格使用增删方法操作覆盖物，避免视图管理错乱
     *
     * 以key为id，value为{},
     * value中目前存储为{ overLay: 为视图对象, } 其他选项
     * */
    mapOverLay: {},
  }),
  actions: {
    initTmap(Tmap) {
      if (this.Tmap) {
        console.log("天地图已经完成初始化，跳过初始化");
        return;
      }
      if (!Tmap) {
        isShowErrorMessage && window.$message.error("Tmap传递为空");
        throw new Error("Tmap传递为空");
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
        isShowErrorMessage && window.$message.error(`addControl 参数不完整`);
        throw new Error(`addControl 参数不完整`);
      }
      // 检查是否已经存在
      if (this.mapControl[id]) {
        isShowErrorMessage && window.$message.error(`当前存储的控件已经存在:${id}`);
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
        isShowErrorMessage && window.$message.error(`removeControl 参数不完整`);
        throw new Error(`removeControl 参数不完整`);
      }
      // 检查是否不存在
      if (!this.mapControl[id]) {
        isShowErrorMessage &&
          window.$message.error(`当前销毁的控件不存在:${id}`);
        throw new Error(`当前销毁的控件不存在:${id}`);
      }
      this.Tmap.removeControl(this.mapControl[id]);
      delete this.mapControl[id];
    },
    /*
     * 添加覆盖物*/
    addOverLay(id, overlay) {
      if (!id || !overlay) {
        isShowErrorMessage && window.$message.error(`addOverLay 参数不完整`);
        throw new Error(`addOverLay 参数不完整`);
      }
      // 检查是否已经存在
      if (this.mapOverLay[id]) {
        isShowErrorMessage &&
          window.$message.error(`当前存储的覆盖物已经存在:${id}`);
        throw new Error(`当前存储的覆盖物已经存在:${id}`);
      }
      this.mapOverLay[id] = overlay;
      this.Tmap.addOverLay(overlay);
    },
    /*
     * 移除overLay覆盖物
     * */
    removeOverLay(id) {
      if (!id) {
        isShowErrorMessage && window.$message.error(`removeOverLay 参数不完整`);
        throw new Error(`removeOverLay 参数不完整`);
      }
      // 检查是否不存在
      if (!this.mapOverLay[id]) {
        isShowErrorMessage &&
          window.$message.error(`当前销毁的覆盖物不存在:${id}`);
        throw new Error(`当前销毁的覆盖物不存在:${id}`);
      }
      this.Tmap.removeOverLay(this.mapOverLay[id]);
      delete this.mapOverLay[id];
    },
  },
});
