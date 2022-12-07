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

// 实时天气接口
export function weatherNow(data) {
  const { apiUrl, getApiKey } = useQweatherOptionsStore();
  return request({
    url: `${apiUrl}/v7/weather/now`,
    method: "get",
    params: {
      key: getApiKey(),
      ...data,
    },
  });
}

// 7天天气预报
export function weather7d(data) {
  const { apiUrl, getApiKey } = useQweatherOptionsStore();
  return request({
    url: `${apiUrl}/v7/weather/7d`,
    method: "get",
    params: {
      key: getApiKey(),
      ...data,
    },
  });
}

// 24小时天气预报
export function weather24h(data) {
  const { apiUrl, getApiKey } = useQweatherOptionsStore();
  return request({
    url: `${apiUrl}/v7/weather/24h`,
    method: "get",
    params: {
      key: getApiKey(),
      ...data,
    },
  });
}

// 分钟降水预报
export function minutely5m(data) {
  const { apiUrl, getApiKey } = useQweatherOptionsStore();
  return request({
    url: `${apiUrl}/v7/minutely/5m`,
    method: "get",
    params: {
      key: getApiKey(),
      ...data,
    },
  });
}
