import { Plugin, ProxyOptions } from "vite";

type proxyTableType = Record<"string", ProxyOptions> | "string";

interface optsType {
  mockPath: string;
  /** proxyTable can be a path string referring to a outside proxyTable  */
  proxyTable: proxyTableType;
}

declare function VitePluginProxyMiddleware(opts: optsType): Plugin;

export default VitePluginProxyMiddleware;
