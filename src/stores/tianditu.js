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
        isShowErrorMessage &&
          window.$message.error(`当前存储的控件已经存在:${id}`);
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
     * 添加覆盖物
     *
     * 1. 如果是MarkerClusterer，请使用addMarkerClusterer
     * */
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
     *
     * 1. 如果是MarkerClusterer，请使用removeMarkerClusterer
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
    /*
     * 添加某一种类的多个覆盖物
     * 该方法不会检查添加的视图是否重复存在，只会在相应的id中累计添加，
     * 如果没有该id，则根据固定命名规则创建ID后添加视图
     * id ｜ 唯一命名
     * overlays ｜ 可以传入单个视图或者数组
     * 命名以_ARRAY_开头的覆盖物
     * 如 城市标点
     * */
    addOverLayForType(id, overlays) {
      if (!id || !overlays) {
        isShowErrorMessage &&
          window.$message.error(`addOverLayForType 参数不完整`);
        throw new Error(`addOverLayForType 参数不完整`);
      }
      // 固定规则命名，用于区分
      const ID = `_ARRAY_${id}`;
      let lays = [];
      // 判断overlays是不是一个数组
      Array.isArray(overlays) ? (lays = overlays) : (lays = [overlays]);
      lays.map((item) => {
        this.Tmap.addOverLay(item);
      });
      // console.log(overlays, lays);
      this.mapOverLay[ID]
        ? (this.mapOverLay[ID] = this.mapOverLay[ID].concat(lays))
        : (this.mapOverLay[ID] = lays);
    },
    /*
     * 移除某一种类的多个覆盖物
     * 命名以_ARRAY_开头的覆盖物
     * */
    removeOverLayForType(id) {
      if (!id) {
        isShowErrorMessage &&
          window.$message.error(`removeOverLayForType 参数不完整`);
        throw new Error(`removeOverLayForType 参数不完整`);
      }
      // 固定规则命名，用于区分
      const ID = `_ARRAY_${id}`;
      // 检查是否不存在
      if (!this.mapOverLay[ID]) {
        isShowErrorMessage &&
          window.$message.error(`当前销毁的覆盖物类不存在:${ID}`);
        throw new Error(`当前销毁的覆盖物类不存在:${ID}`);
      }
      this.mapOverLay[ID].map((item) => {
        this.Tmap.removeOverLay(item);
      });
      delete this.mapOverLay[ID];
    },
    /*
    * 因为MarkerClusterer的特殊性，new 就会在地图中添加视图
    * 单独写一个方法，用于在mapOverLay创建和删除
    * 使用时无需执行new window.T.MarkerClusterer
    * 只需要传入{
          markers: markerArr,
          ·······
        }
    * 方法内部执行完成后 返回视图
    * 添加 MarkerClusterer
    *
    * id mapOverLay的唯一名称
    * obj 创建视图的MarkerClustererOptions，
    * */
    addMarkerClusterer(id, MarkerClustererOptions) {
      if (!id || !MarkerClustererOptions) {
        isShowErrorMessage &&
          window.$message.error(`addMarkerClusterer 参数不完整`);
        throw new Error(`addMarkerClusterer 参数不完整`);
      }
      // 检查是否已经存在
      if (this.mapOverLay[id]) {
        isShowErrorMessage &&
          window.$message.error(`当前存储的覆盖物已经存在:${id}`);
        throw new Error(`当前存储的覆盖物已经存在:${id}`);
      }
      const _MarkerClusterer = new window.T.MarkerClusterer(this.Tmap, MarkerClustererOptions);
      this.mapOverLay[id] = _MarkerClusterer;
      /*
       * this.Tmap.addOverLay(overlay);
       * 没有执行该方法，因为本人尝试执行之后，会出现问题
       * 问题现象：使用addOverLay和removeOverLay多次操作之后会出现无法聚合的问题
       * 遂不执行
       * */
      return _MarkerClusterer;
    },
    /*
     * 因为MarkerClusterer的特殊性，new 就会在地图中添加视图
     * 单独写一个方法，用于在mapOverLay创建和删除
     * 使用clearMarkers清除视图
     *
     * 删除 MarkerClusterer
     * id 唯一命名
     * */
    removeMarkerClusterer(id) {
      if (!id) {
        isShowErrorMessage &&
          window.$message.error(`removeMarkerClusterer 参数不完整`);
        throw new Error(`removeMarkerClusterer 参数不完整`);
      }
      // 检查是否不存在
      if (!this.mapOverLay[id]) {
        isShowErrorMessage &&
          window.$message.error(`当前销毁的覆盖物不存在:${id}`);
        throw new Error(`当前销毁的覆盖物不存在:${id}`);
      }
      this.mapOverLay[id].clearMarkers();
      delete this.mapOverLay[id];
    },
  },
});
