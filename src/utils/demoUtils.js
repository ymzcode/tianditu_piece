/*
 * 该文件所有方法，只服务于demo特殊情况，对实际项目帮助不大
 * */

import { tianditu_tokens } from "@/config";

/*
 * 随机分发地图加载的token，避免资源耗尽过快
 * */
export function randomCreateUrl() {
  const index = Math.floor(Math.random() * 3);
  // 存储一下
  window.localStorage.setItem("demo_tokens_index", index);
  return `https://api.tianditu.gov.cn/api?v=4.0&tk=${tianditu_tokens[index]}`;
}

/*
 * 随机设置地图加载的类型，避免同一地图资源耗尽过快
 * */
export function randomCreateMapType() {
  const types = [
    // 此地图类型展示普通街道视图。
    "TMAP_NORMAL_MAP",
    // 此地图类型展示卫星视图。
    "TMAP_SATELLITE_MAP",
    // 此地图类型展示卫星和路网的混合视图。
    "TMAP_HYBRID_MAP",
    // 此地图类型展示地形视图。
    "TMAP_TERRAIN_MAP",
    // 此地图类型展示地形和路网的混合视图。
    "TMAP_TERRAIN_HYBRID_MAP",
  ];
  const index = Math.floor(Math.random() * 5);
  window.localStorage.setItem("demo_maptype_index", index);

  return window[types[index]];
}
