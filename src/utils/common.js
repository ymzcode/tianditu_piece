/*
 * 防抖*/
export function debounce(fn, delay = 500) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

/*
 * 节流*/
export function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

/*
 * 动态加载js
 * */
export function loadJs(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve("success");
    };
    script.onerror = () => {
      reject("error");
    };
  });
}

/*
 * 获取assets静态资源地址
 * */
export function getAssetsFile(url) {
  console.log(url);
  return new URL(url, import.meta.url).href;
}
