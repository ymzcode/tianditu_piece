import { request } from "@/api/request";

// 全国幼儿园数据接口
export function nationalKindergarten() {
  return request({
    url: "https://console.tianditu.gov.cn/data/center-data/publish/1ce7f182791c4e889a6d73e91d0e32bf",
    method: "get",
  });
}

// 本地全国幼儿园数据接口
export function localNationalKindergarten() {
  return request({
    url: `${import.meta.env.BASE_URL}json/kindergarten-new.json`,
    method: "get",
  });
}
