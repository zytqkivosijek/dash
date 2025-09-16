'use client'

import * as React from 'react'
import { IconPalette, IconCheck } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const themes = [
  {
    name: 'Default',
    value: 'default',
    colors: {
      primary: 'oklch(0.205 0 0)',
      accent: 'oklch(0.97 0 0)',
    }
  },
  {
    name: 'Blue',
    value: 'blue',
    colors: {
      primary: 'oklch(0.5 0.2 240)',
      accent: 'oklch(0.95 0.05 240)',
    }
  },
  {
    name: 'Green',
    value: 'green',
    colors: {
      primary: 'oklch(0.4 0.15 140)',
      accent: 'oklch(0.95 0.05 140)',
    }
  },
  {
    name: 'Purple',
    value: 'purple',
    colors: {
      primary: 'oklch(0.45 0.2 280)',
      accent: 'oklch(0.95 0.05 280)',
    }
  },
  {
    name: 'Orange',
    value: 'orange',
    colors: {
      primary: 'oklch(0.55 0.2 50)',
      accent: 'oklch(0.95 0.05 50)',
    }
  }
]

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = React.useState('default')

  const applyTheme = (theme: typeof themes[0]) => {
    const root = document.documentElement
    
    // Apply light theme colors
    root.style.setProperty('--primary', theme.colors.primary)
    root.style.setProperty('--accent', theme.colors.accent)
    root.style.setProperty('--sidebar-primary', theme.colors.primary)
    root.style.setProperty('--sidebar-accent', theme.colors.accent)
    
    // For dark mode, adjust the colors
    const darkPrimary = theme.value === 'default' 
      ? 'oklch(0.985 0 0)' 
      : `oklch(0.8 ${theme.colors.primary.match(/0\.\d+/)?.[0] || '0.2'} ${theme.colors.primary.match(/\d+(?=\))/)?.[0] || '240'})`
    
    const darkAccent = theme.value === 'default'
      ? 'oklch(0.269 0 0)'
      : `oklch(0.3 ${theme.colors.accent.match(/0\.\d+/)?.[0] || '0.05'} ${theme.colors.accent.match(/\d+(?=\))/)?.[0] || '240'})`

    // Apply dark theme colors via CSS custom properties
    const darkThemeCSS = `
      .dark {
        --primary: ${darkPrimary};
        --accent: ${darkAccent};
        --sidebar-primary: ${darkPrimary};
        --sidebar-accent: ${darkAccent};
      }
    `
    
    // Remove existing theme style if any
    const existingStyle = document.getElementById('dynamic-theme')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    // Add new theme style
    const style = document.createElement('style')
    style.id = 'dynamic-theme'
    style.textContent = darkThemeCSS
    document.head.appendChild(style)
    
    setSelectedTheme(theme.value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton tooltip="Escolher Tema">
          <IconPalette />
          <span>Temas</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => applyTheme(theme)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <span>{theme.name}</span>
            </div>
            {selectedTheme === theme.value && (
              <IconCheck className="w-4 h-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}