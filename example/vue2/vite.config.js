import { createVuePlugin } from "vite-plugin-vue2";
import VitePluginVue2Suffix from "vite-plugin-vue2-suffix";
import VitePluginProxyMiddleware from "../../dist";

const path = require("path");

export default {
  plugins: [
    createVuePlugin(),
    VitePluginVue2Suffix(),
    VitePluginProxyMiddleware({
      proxyTable: path.resolve("./proxy-table"),
    }),
  ],
  server: {
    /* https option must be turn on,so that you can use h2 */
    https: {
      key: xxx,
      cert: xxx,
    },

    /* proxy option can be ignored */
    proxy: xxx,
  },
};
