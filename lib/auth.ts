import { localAuth } from './auth-local'

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

// Função para verificar autenticação
export async function checkAuth(): Promise<boolean> {
  return localAuth.isAuthenticated()
}