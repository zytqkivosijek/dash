// Sistema de banco de dados local simulado usando localStorage
// Simula operações de banco de dados com persistência local

export interface LocalDBTable<T> {
  data: T[]
  lastId: number
}

class LocalDatabase {
  private getTable<T>(tableName: string): LocalDBTable<T> {
    const stored = localStorage.getItem(`db_${tableName}`)
    if (stored) {
      return JSON.parse(stored)
    }
    return { data: [], lastId: 0 }
  }

  private saveTable<T>(tableName: string, table: LocalDBTable<T>): void {
    localStorage.setItem(`db_${tableName}`, JSON.stringify(table))
  }

  // Operações CRUD genéricas
  async findAll<T>(tableName: string): Promise<T[]> {
    const table = this.getTable<T>(tableName)
    return table.data
  }

  async findById<T extends { id: number }>(tableName: string, id: number): Promise<T | null> {
    const table = this.getTable<T>(tableName)
    return table.data.find(item => item.id === id) || null
  }

  async create<T extends { id?: number }>(tableName: string, data: Omit<T, 'id'>): Promise<T> {
    const table = this.getTable<T>(tableName)
    const newId = table.lastId + 1
    const newItem = { ...data, id: newId } as T
    
    table.data.push(newItem)
    table.lastId = newId
    this.saveTable(tableName, table)
    
    return newItem
  }

  async update<T extends { id: number }>(tableName: string, id: number, updates: Partial<T>): Promise<T | null> {
    const table = this.getTable<T>(tableName)
    const index = table.data.findIndex(item => item.id === id)
    
    if (index === -1) return null
    
    table.data[index] = { ...table.data[index], ...updates }
    this.saveTable(tableName, table)
    
    return table.data[index]
  }

  async delete<T extends { id: number }>(tableName: string, id: number): Promise<boolean> {
    const table = this.getTable<T>(tableName)
    const index = table.data.findIndex(item => item.id === id)
    
    if (index === -1) return false
    
    table.data.splice(index, 1)
    this.saveTable(tableName, table)
    
    return true
  }

  // Operações específicas para filtros
  async findWhere<T>(tableName: string, predicate: (item: T) => boolean): Promise<T[]> {
    const table = this.getTable<T>(tableName)
    return table.data.filter(predicate)
  }

  // Inicializar dados padrão se não existirem
  async initializeDefaults<T>(tableName: string, defaultData: T[]): Promise<void> {
    const table = this.getTable<T>(tableName)
    if (table.data.length === 0) {
      table.data = defaultData
      table.lastId = Math.max(...defaultData.map((item: any) => item.id), 0)
      this.saveTable(tableName, table)
    }
  }
}

export const localDB = new LocalDatabase()