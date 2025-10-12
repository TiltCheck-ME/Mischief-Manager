/*
 * Mischief Manager - Main Entry Point
 * Copyright (c) 2025 Jamie Vargas
 * Licensed under the MIT License - see LICENSE file for details
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
