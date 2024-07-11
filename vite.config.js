import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
    if (command === "serve") {
        return {
            //root: './out',
            //root: './project/yegan',
            //root: './test/signin/signin.html',
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
                    deny: [".env", ".env.*", "*.{pem, crt}"],
                },
                origin: "*",
            },
            build: {
                minify: "terser",
                //minify: false,
                //target: ['es2015'],
                // lib: {
                //     entry: resolve("/script"),
                //     name: "libTest",
                //     filename: "libTest",
                // },
            },
        };
    }
});
