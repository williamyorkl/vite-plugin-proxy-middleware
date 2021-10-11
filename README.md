# vite-plugin-proxy-middleware

a vite plugin that solve the conflict problem between turning on vite proxy and http2, you can use both http2 and proxy at the same time ;-)

Reason for the limitation between `h2` and `proxy` are saying explicitly on Vite's website:
https://vitejs.dev/config/#server-https

<br/>

## Usage

#### 1. Install

```bash
npm i vite-plugin-proxy-middleware -D
```

#### 2. Add it to `vite.config.js`

```js
// vite.config.js
import { createVuePlugin } from "vite-plugin-vue2";
import VitePluginProxyMiddleware from "vite-plugin-proxy-middleware";

const path = require("path");

export default {
  plugins: [
    createVuePlugin(),
    VitePluginProxyMiddleware({
      proxyTable: path.resolve(__dirname, "./proxy-table"),
    }),
  ],
  server: {
    /* https option must be turned on,so that you can use h2 */
    https: {
      key: "./cert/xxx.cert",
      cert: "./cert/xxx.key",
    },

    /* vite's original proxy must be ignored,or else it will impact on h2 setting turning on */
    // proxy: xxx,
  },
};
```

#### 3. Config your proxy table setting to the option: `proxyTable`

```js
// vite proxy table example

module.exports = {
  dev: {
    "/admin": {
      target: "http://xxx-dev.com/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  test: {
    "/admin": {
      target: "http://xxx-test.com/",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  gray: {
    "/admin": {
      target: "http://xxx-gray.com",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
  prod: {
    "/admin": {
      target: "http://xxx-prod.com",
      rewrite: (path) => path.replace(/^\/admin/, ""),
    },
  },
};
```

#### 4. Generate a SSL certificate

> What's more important, please generate a SSL certificate to ensure that your `https` protocols works locally, only if your `https` works, so that you can use http2

How to generate a local SSL certificate：

1. https://github.com/FiloSottile/mkcert

2. https://www.jianshu.com/p/7cb5c2cffaaa

#### 5. Some the other options for reference

```ts
interface userOptsType {
  /** if you are using mock, specify a mockPath, default value is '/dev-mock',  */
  mockPath?: string;

  /** proxyTable can be a proxyTable.js path string or proxyTable object  */
  proxyTable: proxyTableType;

  /** public host config (if you have a host name for your develop environment,such as "xxx-dev.xxx.com", you can set it here, which will be much easier for your to click the link and open the page on browser)  */
  publicHost?: string;
}
```

#### 6. That's all

<br/>

## License

MIT License © 2021 [williamyorkl](https://github.com/williamyorkl)
