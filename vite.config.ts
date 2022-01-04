import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // fix @logseq/lib Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  build: {
    target: "esnext",
    // minify: "esbuild",
  },
})
