import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.js",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
    },
  ],
  plugins: [
    // terser({
    //   output: {
    //     ascii_only: true, // 仅输出ascii字符
    //   },
    //   compress: {
    //     pure_funcs: ["console.log"], // 去掉console.log函数
    //   },
    // }),
  ],
};
