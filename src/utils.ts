import proxy from "http2-proxy";
import { proxyTableType } from "./index";

import { Connect } from "vite";

export interface middleWareOptsType {
  viteProtocol: number | string;
  vitePort: number | string;
  mockPath: string;
  proxyTableMap: Exclude<proxyTableType, string>;
}

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export function generateMiddlewareProxyTable({
  viteProtocol,
  vitePort,
  mockPath,
  proxyTableMap,
}: middleWareOptsType): Connect.HandleFunction {
  // let proxyTable;
  let proxyTableResolved = [];

  // try {
  //   proxyTable = require(path.resolve(__dirname, "../../config/proxy-table"));
  // } catch (error) {
  //   console.log("exports.generateMiddlewareProxyTable -> error", error);
  // }

  // 生成 proxyTableResolved （对应middlewares的格式进行遍历）

  for (const key in proxyTableMap) {
    const proxyPath = key;
    const { target, rewrite } = proxyTableMap[proxyPath];

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
