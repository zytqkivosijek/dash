'use client'

import * as React from 'react'
import { IconPalette, IconCheck } from '@tabler/icons-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const themes = [
  {
    name: 'Default',
    value: 'default',
    description: 'Tema padrão com cores neutras',
    colors: {
      primary: 'oklch(0.205 0 0)',
      accent: 'oklch(0.97 0 0)',
    }
  },
  {
    name: 'Cosmic Night',
    value: 'cosmic-night',
    description: 'Tema escuro com tons roxos e azuis',
    colors: {
      primary: '#6e56cf',
      accent: '#d8e6ff',
      background: '#f5f5ff',
      foreground: '#2a2a4a',
      card: '#ffffff',
      secondary: '#e4dfff',
      muted: '#f0f0fa',
      border: '#e0e0f0',
      sidebar: '#f0f0fa',
    },
    darkColors: {
      primary: '#a48fff',
      accent: '#303060',
      background: '#0f0f1a',
      foreground: '#e2e2f5',
      card: '#1a1a2e',
      secondary: '#2d2b55',
      muted: '#222244',
      border: '#303052',
      sidebar: '#1a1a2e',
    }
  },
  {
    name: 'Blue',
    value: 'blue',
    description: 'Tema azul profissional',
    colors: {
      primary: 'oklch(0.5 0.2 240)',
      accent: 'oklch(0.95 0.05 240)',
    }
  },
  {
    name: 'Green',
    value: 'green',
    description: 'Tema verde natural',
    colors: {
      primary: 'oklch(0.4 0.15 140)',
      accent: 'oklch(0.95 0.05 140)',
    }
  },
  {
    name: 'Purple',
    value: 'purple',
    description: 'Tema roxo criativo',
    colors: {
      primary: 'oklch(0.45 0.2 280)',
      accent: 'oklch(0.95 0.05 280)',
    }
  },
  {
    name: 'Orange',
    value: 'orange',
    description: 'Tema laranja energético',
    colors: {
      primary: 'oklch(0.55 0.2 50)',
      accent: 'oklch(0.95 0.05 50)',
    }
  }
]

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = React.useState('default')

  React.useEffect(() => {
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('selected-theme')
    if (savedTheme) {
      setSelectedTheme(savedTheme)
    }
  }, [])

  const applyTheme = (theme: typeof themes[0]) => {
    const root = document.documentElement
    
    if (theme.value === 'cosmic-night') {
      // Apply Cosmic Night theme with complete color palette
      const lightColors = theme.colors as any
      const darkColors = theme.darkColors as any
      
      // Apply light theme colors
      root.style.setProperty('--background', lightColors.background)
      root.style.setProperty('--foreground', lightColors.foreground)
      root.style.setProperty('--card', lightColors.card)
      root.style.setProperty('--card-foreground', lightColors.foreground)
      root.style.setProperty('--popover', lightColors.card)
      root.style.setProperty('--popover-foreground', lightColors.foreground)
      root.style.setProperty('--primary', lightColors.primary)
      root.style.setProperty('--primary-foreground', '#ffffff')
      root.style.setProperty('--secondary', lightColors.secondary)
      root.style.setProperty('--secondary-foreground', '#4a4080')
      root.style.setProperty('--muted', lightColors.muted)
      root.style.setProperty('--muted-foreground', '#6c6c8a')
      root.style.setProperty('--accent', lightColors.accent)
      root.style.setProperty('--accent-foreground', lightColors.foreground)
      root.style.setProperty('--destructive', '#ff5470')
      root.style.setProperty('--destructive-foreground', '#ffffff')
      root.style.setProperty('--border', lightColors.border)
      root.style.setProperty('--input', lightColors.border)
      root.style.setProperty('--ring', lightColors.primary)
      root.style.setProperty('--chart-1', lightColors.primary)
      root.style.setProperty('--chart-2', '#9e8cfc')
      root.style.setProperty('--chart-3', '#5d5fef')
      root.style.setProperty('--chart-4', '#7c75fa')
      root.style.setProperty('--chart-5', '#4740b3')
      root.style.setProperty('--sidebar', lightColors.sidebar)
      root.style.setProperty('--sidebar-foreground', lightColors.foreground)
      root.style.setProperty('--sidebar-primary', lightColors.primary)
      root.style.setProperty('--sidebar-primary-foreground', '#ffffff')
      root.style.setProperty('--sidebar-accent', lightColors.accent)
      root.style.setProperty('--sidebar-accent-foreground', lightColors.foreground)
      root.style.setProperty('--sidebar-border', lightColors.border)
      root.style.setProperty('--sidebar-ring', lightColors.primary)

      // Apply dark theme colors via CSS
      const darkThemeCSS = `
        .dark {
          --background: ${darkColors.background};
          --foreground: ${darkColors.foreground};
          --card: ${darkColors.card};
          --card-foreground: ${darkColors.foreground};
          --popover: ${darkColors.card};
          --popover-foreground: ${darkColors.foreground};
          --primary: ${darkColors.primary};
          --primary-foreground: ${darkColors.background};
          --secondary: ${darkColors.secondary};
          --secondary-foreground: #c4c2ff;
          --muted: ${darkColors.muted};
          --muted-foreground: #a0a0c0;
          --accent: ${darkColors.accent};
          --accent-foreground: ${darkColors.foreground};
          --destructive: #ff5470;
          --destructive-foreground: #ffffff;
          --border: ${darkColors.border};
          --input: ${darkColors.border};
          --ring: ${darkColors.primary};
          --chart-1: ${darkColors.primary};
          --chart-2: #7986cb;
          --chart-3: #64b5f6;
          --chart-4: #4db6ac;
          --chart-5: #ff79c6;
          --sidebar: ${darkColors.sidebar};
          --sidebar-foreground: ${darkColors.foreground};
          --sidebar-primary: ${darkColors.primary};
          --sidebar-primary-foreground: ${darkColors.background};
          --sidebar-accent: ${darkColors.accent};
          --sidebar-accent-foreground: ${darkColors.foreground};
          --sidebar-border: ${darkColors.border};
          --sidebar-ring: ${darkColors.primary};
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
      
    } else {
      // Apply other themes with the original logic
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
    }
    
    setSelectedTheme(theme.value)
    // Salvar tema no localStorage
    localStorage.setItem('selected-theme', theme.value)
  }

  const getThemePreviewColor = (theme: typeof themes[0]) => {
    if (theme.value === 'cosmic-night') {
      return theme.colors.primary
    }
    return theme.colors.primary
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconPalette className="w-5 h-5" />
            Selecionar Tema
          </CardTitle>
          <CardDescription>
            Escolha um tema para personalizar a aparência do dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.value}
                className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedTheme === theme.value 
                    ? 'border-primary bg-accent/50 shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => applyTheme(theme)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: getThemePreviewColor(theme) }}
                    />
                    <div>
                      <h3 className="font-medium">{theme.name}</h3>
                    </div>
                  </div>
                  {selectedTheme === theme.value && (
                    <IconCheck className="w-5 h-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {theme.description}
                </p>
                
                {/* Preview das cores */}
                <div className="flex gap-1 mt-3">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: getThemePreviewColor(theme) }}
                  />
                  {theme.value === 'cosmic-night' && (
                    <>
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                    </>
                  )}
                  {theme.value !== 'cosmic-night' && theme.value !== 'default' && (
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tema Atual</CardTitle>
          <CardDescription>
            Tema selecionado: {themes.find(t => t.value === selectedTheme)?.name || 'Default'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {themes.find(t => t.value === selectedTheme)?.description || 'Tema padrão com cores neutras'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}