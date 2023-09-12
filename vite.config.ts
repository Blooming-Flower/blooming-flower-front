import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  assetsInclude: ["**/*.doc"],
  server: {
    host: true,
    port: 29091,
    open: true, //'/map' //true
    proxy: {
      '/api':'http://43.201.142.170:29091'
    }
  },
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1500,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.warn",
          "console.debug",
          "console.error",
        ],
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: "vite_assets/[name].[hash].js",
        chunkFileNames: "vite_assets/[name]-[hash].js",
        assetFileNames: "vite_assets/[name]-[hash][extname]",
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    },
    // sourcemap: true,
    // manifest: true
  },
  resolve: {
    alias: [
      { find: "@pages", replacement: "/src/pages" },
      { find: "@css", replacement: "/src/assets/css" },
      { find: "@images", replacement: "/src/assets/images" },
      { find: "@data", replacement: "/src/assets/data" },
      { find: "@class", replacement: "/src/class" },
      { find: "@modules", replacement: "/src/modules" },
      { find: "@common", replacement: "/src/common" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@components", replacement: "/src/components" },
    ],
  },
  plugins: [
    react(),
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  base: "/"
});
