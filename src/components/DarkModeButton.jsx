"use client"

// import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button className='' onClick={e => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  )
}
