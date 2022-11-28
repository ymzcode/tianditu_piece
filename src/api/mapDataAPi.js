import { request } from "@/api/request";

// 空气质量接口
export function airQuality() {
  return request({
    url: "https://cd668ee7-8151-4ac6-aeeb-ab0fc9b91400.bspapp.com/air-quality",
    method: "get"
  });
}

// 全国幼儿园数据接口
export function nationalKindergarten() {
  return request({
    url: "https://cd668ee7-8151-4ac6-aeeb-ab0fc9b91400.bspapp.com/air-quality",
    method: "get"
  })
}
