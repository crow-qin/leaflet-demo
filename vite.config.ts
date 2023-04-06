import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // 处理 styled-components

          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: true,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    // proxy: {
    //   "/appmaptile": {
    //     target: "http://webrdo2.is.autonavi.com",
    //     changeOrigin: true,
    //     // rewrite: () => "/appmaptile",
    //   },
    // },
  },
});
