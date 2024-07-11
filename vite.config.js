import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return {
      server: {
        host: true,
        port: 8083,
        strictPort: true,
        hmr: {
          clientPort: 8083,
        },
      },
      define: {
        isBuild: true,
        test24: {},
      },
    };
  } else {
    return {
      server: {
        fs: {
          deny: [".env", ".env.*", "*.{pem,crt}"],
        },
        origin: "*",
      },
      build: {
        minify: "terser",
        //minify: false,
        //target: ['es2015'],
        // lib: {
        //     entry: resolve('/script'),
        //     name: 'libTest',
        //     filename: 'libTest',
        // },
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
            // 다른 엔트리 포인트가 필요하다면 여기에 추가하세요
          },
        },
      },
    };
  }
});
