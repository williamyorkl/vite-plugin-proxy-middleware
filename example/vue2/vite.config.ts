import { pathToFileURL } from "url";
import { createVuePlugin } from "vite-plugin-vue2";

import VitePluginVue2Suffix from "vite-plugin-vue2-suffix";

import VitePluginProxyMiddleware from "../../dist";

const path = require("path");

export default {
  plugins: [
    createVuePlugin(),
    VitePluginVue2Suffix(),
    VitePluginProxyMiddleware({
      proxyTable: path.resolve("./proxy-table.ts"),
    }),
  ],
};
