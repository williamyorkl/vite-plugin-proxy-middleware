/**
 * vite proxytable sample
 * */

const stageProxyTable = {
  dev: {
    "/admin": {
      target: "http://xxx-dev.com/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  test: {
    "/admin": {
      target: "http://xxx-test.com/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  gray: {
    "/admin": {
      target: "http://xxx-gray.com",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  prod: {
    "/admin": {
      target: "http://xxx-prod.com",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
};

/** 总代理表 */
module.exports = {
  // 1. 不同测试环境代理表
  ...stageProxyTable[process.env.connect],

  // 2. 用了mock的接口，地址转发到本地机器上
  "/dev-mock": {
    target: `http://127.0.0.1:${process.env.PORT}/`,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/dev-mock/, ""),
  },

  // 3. 后台开发同学电脑
  "/backend001": {
    target: "http://192.168.xx.xx:8000",
    rewrite: (path) => path.replace(/^\/backend001/, ""),
  },
  "/backend002": {
    target: "http://192.168.xx.xx:8000",
    rewrite: (path) => path.replace(/^\/backend002/, ""),
  },
};
