import { defineConfig } from 'vite'
import path from 'path'
import aliases from './client/config/aliases'
import react from '@vitejs/plugin-react'

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases('client')).map(([key, value]) => [key, path.resolve(__dirname, value)])
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  root: 'client/',
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080,
    host: true
  },
  resolve: {
    alias: resolvedAliases
  }
})
