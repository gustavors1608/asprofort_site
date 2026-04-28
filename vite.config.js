import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Minificação agressiva com Terser (já presente no devDependencies)
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.warn"],
      },
    },
    // Chunk splitting: separa vendors do código da aplicação
    rollupOptions: {
      output: {
        manualChunks: {
          // Apenas React fica fixo no critical path — é sempre necessário
          "vendor-react":  ["react", "react-dom"],
          // framer-motion e radix são lazy: o Rollup os coloca em chunks dinâmicos
          // automaticamente quando detecta que só lazy imports os referenciam
          "vendor-icons":  ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 300,
    cssCodeSplit: true,
  },
});
