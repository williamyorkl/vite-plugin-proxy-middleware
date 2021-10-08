import { Connect } from "vite";

type protocolType = number | string;
type portType = number | string;

export declare function generateMiddlewareProxyTable(params: {
  viteProtocol: protocolType;
  vitePort: portType;
}): Connect.HandleFunction;
