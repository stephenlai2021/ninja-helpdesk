'use client'

import { ThemeProvider } from 'next-themes'

export default function DarkModeProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}