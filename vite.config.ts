import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";
import { registerRoute } from "workbox-routing";
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            handler: "CacheFirst",
            urlPattern: /\/assets\/.*\/*.svg/,
            method: "GET",
          },
          {
            handler: "CacheFirst",
            urlPattern: /\/imgs\/.*\/*.svg/,
            method: "GET",
          },
        ],
      },
    }),
    preact(),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
