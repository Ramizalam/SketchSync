import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { babel } from "@rollup/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),

    babel({ babelHelpers: "bundled", extensions: [".ts", ".tsx"], plugins: [ ["@babel/plugin-proposal-decorators", { legacy: true }], ["@babel/plugin-proposal-class-properties", { loose: true }] ] })
  ],
})
