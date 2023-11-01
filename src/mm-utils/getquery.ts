export const getQuery = (url = window.location.href) => {
  const arrList = url.split("#");

  let paramData:any = {};

  arrList.forEach((strItem) => {
    let str = strItem; // 取得整个地址栏
    const num = str.indexOf("?");
    str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]
    if (num > -1) {
      const arr = str.split("&"); // 各个参数放到数组里
      for (let i = 0; i < arr.length; i += 1) {
        const n = arr[i].indexOf("=");
        if (n > 0) {
          // "&key=value" 键值对
          const key = arr[i].substring(0, n);
          const value = arr[i].substr(n + 1);
          paramData[key] = decodeURIComponent(value);
        } else {
          // "&key" 仅标识
          const key = arr[i];
          if (key !== "") paramData[key] = "";
        }
      }
    }
  });

  return paramData;
}