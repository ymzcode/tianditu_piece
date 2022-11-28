import { request } from "@/api/request";

export function airQuality() {
  return request({
    url: "https://cd668ee7-8151-4ac6-aeeb-ab0fc9b91400.bspapp.com/air-quality",
    method: "get",
  });
}
