/*
 * Mischief Manager - Vite Configuration
 * Copyright (c) 2025 Jamie Vargas
 * Licensed under the MIT License - see LICENSE file for details
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    open: true, // This will open the browser automatically
  },
})
