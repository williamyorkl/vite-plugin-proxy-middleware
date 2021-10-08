/**
 * vite的proxytable
 * 注意，pathRewrite与webpack的不一样
 * */

/** 不同测试环境代理表 */
const stageProxyTable = {
  dev: {
    "/admin": {
      // http://iqsz-d0080:8080/ 开发环境小网关（常亮pc）
      target: "http://lcloud-ark-gwp-dev1.paic.com.cn/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  test1: {
    "/admin": {
      target: "http://lcloud-ark-gwp-stg1.paic.com.cn/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
    "/lbdp-owmp": {
      target: "http://lbdp-owmp-ngx-wgq-stg1-web-padis.paic.com.cn/",
      rewrite: (path) => path.replace(/^\/lbdp-owmp/, ""),
    },
    "/lbdp-ssap": {
      target: "http://lbdp-ssap-stg1.paic.com.cn/",
      rewrite: (path) => path.replace(/^\/lbdp-ssap/, ""),
    },
  },
  test4: {
    "/admin/lbdp-ims": {
      target: "http://lbdp-ims-gwp-wgq-stg4-web-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin\/lbdp-ims/, "/lbdp-ims-stg4"),
    },
    "/admin": {
      target: "http://lbdp-ims-gwp-wgq-stg4-web-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  test5: {
    "/admin/lbdp-ims": {
      target: "http://lbdp-ims-gwp-wgq-stg5-web-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin\/lbdp-ims/, "/lbdp-ims-stg5"),
    },
    "/admin": {
      target: "http://lbdp-ims-gwp-wgq-stg5-web-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  test6: {
    "/admin/lbdp-ims": {
      target: "http://lbdp-ims-gwp-wgq-stg6-web-padis.paic.com.cn",
      rewrite: (path) => path.replace(/^\/admin\/lbdp-ims/, "/lbdp-ims-stg6"),
    },
    "/admin": {
      target: "http://lbdp-ims-gwp-wgq-stg6-web-padis.paic.com.cn",
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
  "/xieyoufeng": {
    target: "http://10.118.144.85:8000",
    rewrite: (path) => path.replace(/^\/xieyoufeng/, ""),
  },
  "/liuaijun": {
    target: "http://10.118.131.179:8000",
    rewrite: (path) => path.replace(/^\/liuaijun/, ""),
  },
  "/zhengjiepeng": {
    target: "http://LQSZ-D03229:8000",
    rewrite: (path) => path.replace(/^\/zhengjiepeng/, ""),
  },
  "/mengshuaibing": {
    target: "http://10.118.123.158:8000",
    rewrite: (path) => path.replace(/^\/mengshuaibing/, ""),
  },
  "/zhangweiwei": {
    target: "http://10.118.117.40:8000",
    rewrite: (path) => path.replace(/^\/zhangweiwei/, ""),
  },
  "/maojie": {
    target: "http://LQSZ-D03231:8000",
    rewrite: (path) => path.replace(/^\/maojie/, ""),
  },
  "/suncheng": {
    target: "http://LQSZ-D02617:8000",
    rewrite: (path) => path.replace(/^\/suncheng/, ""),
  },
  "/liguohui": {
    target: "http://LQSZ-D03206:8000",
    rewrite: (path) => path.replace(/^\/liguohui/, ""),
  },
  "/fujihuang": {
    target: "http://10.118.141.173:8000",
    rewrite: (path) => path.replace(/^\/fujihuang/, ""),
  },
  "/longzhe": {
    target: "http://10.118.115.58:8000",
    rewrite: (path) => path.replace(/^\/longzhe/, ""),
  },
  "/chenyumei": {
    target: "http://LQSZ-L05147:8000",
    rewrite: (path) => path.replace(/^\/chenyumei/, ""),
  },
  "/dengzhipeng": {
    target: "http://LQSZ-L05252:8000",
    rewrite: (path) => path.replace(/^\/dengzhipeng/, ""),
  },
  "/kanghongbin": {
    target: "http://LQSZ-D03284:8000",
    rewrite: (path) => path.replace(/^\/kanghongbin/, ""),
  },
  "/jiangzhouzhou": {
    target: "http://10.118.137.119:8222",
    rewrite: (path) => path.replace(/^\/jiangzhouzhou/, ""),
  },
};
