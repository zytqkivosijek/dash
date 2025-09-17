import { localAuth } from './auth-local'
import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  username?: string
}

export async function login(email: string, password: string): Promise<User | null> {
  try {
    return await localAuth.login(email, password)
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

export async function register(email: string, password: string, username?: string): Promise<User | null> {
  try {
    return await localAuth.register(email, password, username)
  } catch (error) {
    console.error('Register error:', error)
    return null
  }
}

export async function logout(): Promise<void> {
  try {
    await supabase.auth.signOut()
    await localAuth.logout()
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export function getCurrentUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null
  return localAuth.getCurrentUser()
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localAuth.isAuthenticated()
}

export async function checkSupabaseAuth(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch (error) {
    console.error('Supabase auth check error:', error)
    return false
  }
}

// Função para verificar autenticação