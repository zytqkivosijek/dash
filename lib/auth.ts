import { localAuth } from './auth-local'
import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  username?: string
}

export async function login(email: string, password: string): Promise<User | null> {
  try {
    // Limpar dados antigos antes do login
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Supabase login error:', error.message)
      return null
    }

    if (data.user) {
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.user_metadata?.username || data.user.email?.split('@')[0]
      }
      
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
    // Limpar dados antigos antes do registro
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // Desabilitar confirmação por email
        data: {
          username: username || email.split('@')[0]
        }
      }
    })

    if (error) {
      console.error('Supabase register error:', error.message)
      return null
    }

    if (data.user) {
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        username: username || data.user.email?.split('@')[0]
      }
      
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
    await supabase.auth.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export function getCurrentUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userStr = localStorage.getItem('user')
    const isAuth = localStorage.getItem('isAuthenticated')
    
    if (userStr && isAuth === 'true') {
      return JSON.parse(userStr)
    }
  } catch (error) {
    console.error('Error getting user from storage:', error)
  }
  
  return null
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const isAuth = localStorage.getItem('isAuthenticated')
    return isAuth === 'true'
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

export async function checkSupabaseAuth(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Sincronizar com localStorage se usuário está autenticado no Supabase
      const localUser: User = {
        id: user.id,
        email: user.email!,
        username: user.user_metadata?.username || user.email?.split('@')[0]
      }
      localStorage.setItem('user', JSON.stringify(localUser))
      localStorage.setItem('isAuthenticated', 'true')
    }
    
    return !!user
  } catch (error) {
    console.error('Supabase auth check error:', error)
    return false
  }
}
