// Sistema de autenticação local simulado
export interface User {
  id: string
  email: string
  username?: string
  created_at: string
}

interface AuthData {
  users: User[]
  currentUser: User | null
}

class LocalAuth {
  private getAuthData(): AuthData {
    const stored = localStorage.getItem('auth_data')
    if (stored) {
      return JSON.parse(stored)
    }
    return { users: [], currentUser: null }
  }

  private saveAuthData(data: AuthData): void {
    localStorage.setItem('auth_data', JSON.stringify(data))
  }

  async login(email: string, password: string): Promise<User | null> {
    const authData = this.getAuthData()
    
    // Simular verificação de senha (em produção seria hash)
    const user = authData.users.find(u => u.email === email)
    
    if (!user) {
      // Se usuário não existe, criar automaticamente para demo
      return this.register(email, password)
    }
    
    // Simular login bem-sucedido
    authData.currentUser = user
    this.saveAuthData(authData)
    
    // Salvar também no formato antigo para compatibilidade
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAuthenticated', 'true')
    
    return user
  }

  async register(email: string, password: string, username?: string): Promise<User | null> {
    const authData = this.getAuthData()
    
    // Verificar se usuário já existe
    const existingUser = authData.users.find(u => u.email === email)
    if (existingUser) {
      throw new Error('Usuário já existe')
    }
    
    // Criar novo usuário
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      username: username || email.split('@')[0],
      created_at: new Date().toISOString()
    }
    
    authData.users.push(newUser)
    authData.currentUser = newUser
    this.saveAuthData(authData)
    
    // Salvar também no formato antigo para compatibilidade
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('isAuthenticated', 'true')
    
    return newUser
  }

  async logout(): Promise<void> {
    const authData = this.getAuthData()
    authData.currentUser = null
    this.saveAuthData(authData)
    
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  getCurrentUser(): User | null {
    const authData = this.getAuthData()
    return authData.currentUser
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}

export const localAuth = new LocalAuth()