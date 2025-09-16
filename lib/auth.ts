// Sistema de autenticação simples
export interface User {
  username: string
  email: string
}

export const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
  email: 'admin@example.com'
}

export function login(username: string, password: string): User | null {
  if (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password) {
    const user: User = {
      username: DEFAULT_CREDENTIALS.username,
      email: DEFAULT_CREDENTIALS.email
    }
    
    // Salvar no localStorage
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAuthenticated', 'true')
    
    return user
  }
  
  return null
}

export function register(username: string, email: string, password: string): User | null {
  // Para simplicidade, vamos apenas aceitar qualquer registro
  // Em um sistema real, você salvaria no banco de dados
  const user: User = {
    username,
    email
  }
  
  // Salvar no localStorage
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('isAuthenticated', 'true')
  
  return user
}

export function logout(): void {
  localStorage.removeItem('user')
  localStorage.removeItem('isAuthenticated')
}

export function getCurrentUser(): User | null {
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