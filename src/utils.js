import path from "path";
import proxy from "http2-proxy";
import proxyTable from "./proxy-table";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export function generateMiddlewareProxyTable({
  viteProtocol,
  vitePort,
  mockPath,
}) {
  // let proxyTable;
  let proxyTableResolved = [];

  // try {
  //   proxyTable = require(path.resolve(__dirname, "../../config/proxy-table"));
  // } catch (error) {
  //   console.log("exports.generateMiddlewareProxyTable -> error", error);
  // }

  // 生成 proxyTableResolved （对应middlewares的格式进行遍历）
  for (const key in proxyTable) {
    const proxyPath = key;
    const { target, rewrite } = proxyTable[proxyPath];

    const viteProxyUrLTarget =
      target && target.split("//").pop().replace("/", "").split(":");

    const proxyOptions = {
      hostname: viteProxyUrLTarget[0],
      port: Number(viteProxyUrLTarget[1]) || 80,
    };

    proxyTableResolved.push({
      proxyOptions,
      rewrite,
      proxyPath,
    });
  }

  return (req, res, next) => {
    /**
     * 拦截请求
     *  1. mock接口请求 代理 --> 本地vite服务
     *  2. 前端vite文件服务请求  代理 --> 本地h2
     *  3. 其它数据接口请求  代理 --> 测试环境的http服务
     */
    for (let proxyOpts of proxyTableResolved) {
      const { rewrite, proxyOptions, proxyPath } = proxyOpts;
      const proxyOptsResolved = {
        ...proxyOptions,
        path: rewrite(req.originalUrl),
      };

      if (req.originalUrl.includes(proxyPath)) {
        if (req.originalUrl.includes(mockPath)) {
          return proxy.web(req, res, {
            ...proxyOptsResolved,
            protocol: viteProtocol,
            port: vitePort,
          });
        } else {
          return proxy.web(req, res, proxyOptsResolved);
        }
      }
    }
    next();
  };
}