import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Match exact package boundaries (trailing slash) so lookalike
          // packages (react-reconciler, react-is, react-router-dom handled
          // separately below) aren't swept into the wrong chunk.
          if (
            id.includes('node_modules/three/') ||
            id.includes('node_modules/@react-three/') ||
            id.includes('node_modules/react-reconciler/') ||
            id.includes('node_modules/its-fine/') ||
            id.includes('node_modules/zustand/') ||
            id.includes('node_modules/react-is/')
          ) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('@radix-ui/')) {
            return 'ui-vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
