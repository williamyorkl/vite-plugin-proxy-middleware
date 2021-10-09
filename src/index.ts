import { generateMiddlewareProxyTable } from "./utils";
import chalk from "chalk";

import { Plugin, ProxyOptions, ResolvedConfig } from "vite";
import { middleWareOptsType } from "./utils";

interface userOptsType {
  /** specify a mockPath */
  mockPath: string;

  /** proxyTable can be a path string referring to a outside proxyTable  */
  proxyTable: proxyTableType;

  /** public host config  */
  publicHost: string;
}

export type proxyTableType = Record<"string", ProxyOptions> | "string";

async function VitePluginProxyMiddleware(opts: userOptsType): Promise<Plugin> {
  let config: ResolvedConfig;
  let viteProtocol: middleWareOptsType["viteProtocol"];
  let vitePort: middleWareOptsType["vitePort"];
  let proxyTableMap: Record<"string", ProxyOptions>;

  // mock数据地址接口默认值为 "/dev-mock"
  const { mockPath = "/dev-mock", proxyTable, publicHost } = opts;

  // 配置proxyTable地址或者指定一个对象
  if (typeof proxyTable === "string") proxyTableMap = await import(proxyTable);
  else if (typeof proxyTable === "object") proxyTableMap = proxyTable;
  else
    throw new Error(
      "proxyTable is missing, it can be a path or a proxy object"
    );

  return {
    name: "vite-plugin-proxy-middleware",
    configResolved(resolvedConfig) {
      // 存储最终解释配置
      config = resolvedConfig;
      // 协议
      viteProtocol = config.server.https ? "https" : "http";
      // 端口
      vitePort = config.server.port;
    },
    configureServer({ middlewares }) {
      setTimeout(() => {
        console.log(
          chalk.cyan.bold(
            "  > 建议公共域名访问：" +
              `${viteProtocol}://${publicHost}:${vitePort}/  `
          )
        );
        console.log(
          chalk.yellow.bold(
            `  > 目前服务环境为：` + `${process.env.connect}\n\n`
          )
        );
      }, 1000);

      middlewares.use(
        generateMiddlewareProxyTable({
          viteProtocol,
          vitePort,
          mockPath,
          proxyTableMap,
        })
      );
    },
  };
}

export default VitePluginProxyMiddleware;
