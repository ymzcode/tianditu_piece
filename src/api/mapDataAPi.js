import { request } from "@/api/request";

// 全国幼儿园数据接口
export function nationalKindergarten() {
  return request({
    url: "https://file.bingyishow.top/tianditu_piece/json/kindergarten-new.json",
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

// chatGpl接口
export function getChatGpt(params) {
  return request({
    url: "https://fc-mp-1daf0732-4148-4b2d-8bc8-d49dc544271d.next.bspapp.com/chatGptV1",
    method: "get",
    params: params
  });
}
