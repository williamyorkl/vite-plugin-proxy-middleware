import { createVuePlugin } from "vite-plugin-vue2";
import VitePluginVue2Suffix from "vite-plugin-vue2-suffix";
import VitePluginProxyMiddleware from "../../dist";
// import VitePluginProxyMiddleware from "../../src";
import path from "path";

export default {
  plugins: [
    createVuePlugin(),
    VitePluginVue2Suffix(),
    VitePluginProxyMiddleware({
      proxyTable: path.resolve(__dirname, "./proxy-table"),
    }),
  ],
  server: {
    /* https option must be turn on,so that you can use h2 */
    // https: {
    //   key: "./cert/xxx.cert",
    //   cert: "./cert/xxx.key",
    // },
    /* vite's original proxy option must be ignored */
    // proxy: xxx,
  },
};
