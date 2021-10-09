/**
 * vite的proxytable
 * 注意，pathRewrite与webpack的不一样
 * */

/** 不同测试环境代理表 */
const stageProxyTable = {
  dev: {
    "/admin": {
      target: "http://lcloud-ark-gwp-dev1.paic.com.cn/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  test: {
    "/admin": {
      target: "http://lcloud-ark-gwp-stg1.paic.com.cn/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  gray: {
    "/admin": {
      target: "http://lbdp-ims-gwp-yz-wgq-prd1-web-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  prod: {
    "/admin": {
      target: "http://lbdp-ims-gwp-bx-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
};

/** 总代理表 */
export default {
  // 用了mock的接口，地址会转发到本地机器上
  "/dev-mock": {
    target: `http://127.0.0.1:${process.env.PORT}/`,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/dev-mock/, ""),
  },
  ...stageProxyTable[process.env.connect],
  "/xiaoming": {
    target: "http://10.118.144.85:8000",
    rewrite: (path) => path.replace(/^\/xiaoming/, ""),
  },
  "/xiaohong": {
    target: "http://10.118.131.179:8000",
    rewrite: (path) => path.replace(/^\/xiaohong/, ""),
  },
};
