'use client'

import { ThemeProvider } from 'next-themes'

// export default function DarkModeProvider({ children }) {
//   return <ThemeProvider>{children}</ThemeProvider>
// }

export default function DarkModeProvider({children}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  )
}