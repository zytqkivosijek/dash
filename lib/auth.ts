import { supabase, signIn, signUp, signOut, getCurrentUser } from './supabase'

export interface User {
  id: string
  email: string
  username?: string
}

export async function login(email: string, password: string): Promise<User | null> {
  try {
    const { data, error } = await signIn(email, password)
    
    if (error) {
      console.error('Login error:', error.message)
      return null
    }
    
    if (data.user) {
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.email!.split('@')[0]
      }
      
      // Salvar no localStorage para compatibilidade
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAuthenticated', 'true')
      
      return user
    }
    
    return null
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

export async function register(email: string, password: string, username?: string): Promise<User | null> {
  try {
    const { data, error } = await signUp(email, password)
    
    if (error) {
      console.error('Register error:', error.message)
      return null
    }
    
    if (data.user) {
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        username: username || data.user.email!.split('@')[0]
      }
      
      // Salvar no localStorage para compatibilidade
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAuthenticated', 'true')
      
      return user
    }
    
    return null
  } catch (error) {
    console.error('Register error:', error)
    return null
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export function getCurrentUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null
  
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const userStr = localStorage.getItem('user')
  
  if (isAuthenticated === 'true' && userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  
  return null
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isAuthenticated') === 'true'
}

// Função para verificar autenticação com Supabase
export async function checkSupabaseAuth(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    return !!user
  } catch {
    return false
  }
}