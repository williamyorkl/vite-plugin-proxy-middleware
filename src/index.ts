import { generateMiddlewareProxyTable } from "./utils";
import chalk from "chalk";

import { Plugin, ProxyOptions, ResolvedConfig } from "vite";
import { middleWareOptsType } from "./utils";

interface userOptsType {
  /** if you are using mock, specify a mockPath, default value is '/dev-mock',  */
  mockPath?: string;

  /** proxyTable can be a proxyTable.js path string or proxyTable object  */
  proxyTable: proxyTableType;

  /** public host config (if you have a host name for your develop environment,such as "xxx-dev.xxx.com", you can set it here, which will be much easier for your to click the link and open the page on browser)  */
  publicHost?: string;
}

export type proxyTableType = Record<"string", ProxyOptions> | string;

async function VitePluginProxyMiddleware(opts: userOptsType): Promise<Plugin> {
  let config: ResolvedConfig;
  let viteProtocol: middleWareOptsType["viteProtocol"];
  let vitePort: middleWareOptsType["vitePort"];
  let proxyTableMap: Record<"string", ProxyOptions>;

  // defalut mock address： "/dev-mock"
  const { mockPath = "/dev-mock", proxyTable, publicHost } = opts;

  // proxyTable setting
  if (typeof proxyTable === "string") proxyTableMap = await import(proxyTable);
  else if (typeof proxyTable === "object") proxyTableMap = proxyTable;
  else
    throw new Error(
      "proxyTable is missing, it can be a path or a proxy object"
    );

  return {
    name: "vite-plugin-proxy-middleware",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      viteProtocol = config.server.https ? "https" : "http";
      vitePort = config.server.port;
    },
    configureServer({ middlewares }) {
      setTimeout(() => {
        publicHost &&
          console.log(
            chalk.cyan.bold(
              "  > Here is your public host：" +
                `${viteProtocol}://${publicHost}:${vitePort}/  `
            )
          );
        console.log(
          chalk.yellow.bold(
            `  > current serving environment：` + `${process.env.connect}\n\n`
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
