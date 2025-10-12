/*
 * Mischief Manager - Tailwind Configuration
 * Copyright (c) 2025 Jamie Vargas
 * Licensed under the MIT License - see LICENSE file for details
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}