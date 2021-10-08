import { generateMiddlewareProxyTable } from "./utils";
import "colors";
import { error } from "console";

async function VitePluginProxyMiddleware(opts) {
  let config;
  let viteProtocol;
  let vitePort;
  let proxyTableMap;

  // mock数据地址接口默认值为 "/dev-mock"
  const { mockPath = "/dev-mock", proxyTable } = opts;

  // 配置proxyTable地址或者指定一个对象
  if (typeof proxyTable === "string") proxyTableMap = await import(proxyTable);
  else if (typeof proxyTable === "object") proxyTableMap = proxyTable;
  else throw error("proxyTable is missing, it can be a path or a proxy object");

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
          "  > 建议公共域名访问：" +
            `${viteProtocol}://lbdp-ims-dev.paic.com.cn:${vitePort}/  `.cyan
              .bold
        );
        console.log(
          `  > 目前服务环境为：` + `${process.env.connect}\n\n`.bold.yellow
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
