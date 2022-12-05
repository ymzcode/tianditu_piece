import { request } from "@/api/request";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";

// 城市搜索接口
export function citySearch(data) {
  const { apiKey } = useQweatherOptionsStore();
  return request({
    url: "https://geoapi.qweather.com/v2/city/lookup",
    method: "get",
    params: {
      key: apiKey,
      ...data,
    },
  });
}
