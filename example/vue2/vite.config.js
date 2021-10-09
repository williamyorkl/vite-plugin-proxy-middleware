import { createVuePlugin } from "vite-plugin-vue2";
import VitePluginVue2Suffix from "vite-plugin-vue2-suffix";

export default {
  plugins: [createVuePlugin(), VitePluginVue2Suffix()],
};
