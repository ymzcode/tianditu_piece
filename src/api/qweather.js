import { request } from "@/api/request";
import { useQweatherOptionsStore } from "@/stores/qweatherOptions";

// 城市搜索接口
export function citySearch(data) {
  const { getApiKey } = useQweatherOptionsStore();
  return request({
    url: "https://geoapi.qweather.com/v2/city/lookup",
    method: "get",
    params: {
      key: getApiKey(),
      ...data,
    },
  });
}

// 全国监测站数据
export function localNationalStation() {
  return request({
    url: `${
      import.meta.env.BASE_URL
    }json/POI-Air-Monitoring-Station-List-latest.json`,
    method: "get",
  });
}

// 实时空气质量
export function airNow(data) {
  const { apiUrl, getApiKey } = useQweatherOptionsStore();
  return request({
    url: `${apiUrl}/v7/air/now`,
    method: "get",
    params: {
      key: getApiKey(),
      ...data,
    },
  });
}
