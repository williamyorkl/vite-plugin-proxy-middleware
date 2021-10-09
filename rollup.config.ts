import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { resolve } from "path";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
    },
  ],
  plugins: [
    terser({
      output: {
        ascii_only: true, // 仅输出ascii字符
      },
    }),
    typescript({
      tsconfig: resolve("tsconfig.json"),
    }),
  ],
};
