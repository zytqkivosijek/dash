import { supabase } from './supabase'
import { Database } from '@/types/database'

type RegistroCusto = Database['public']['Tables']['registro_custos']['Row']
type RegistroCustoInsert = Database['public']['Tables']['registro_custos']['Insert']
type RegistroCustoUpdate = Database['public']['Tables']['registro_custos']['Update']

export async function getRegistrosCustos(): Promise<RegistroCusto[]> {
  const { data, error } = await supabase
    .from('registro_custos')
    .select('*')
    .order('data', { ascending: false })

  if (error) {
    console.error('Error fetching registro custos:', error)
    return []
  }

  return data || []
}

export async function createRegistroCusto(registro: Omit<RegistroCustoInsert, 'user_id'>): Promise<RegistroCusto | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('registro_custos')
    .insert({
      ...registro,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating registro custo:', error)
    return null
  }

  return data
}

export async function updateRegistroCusto(id: string, updates: RegistroCustoUpdate): Promise<RegistroCusto | null> {
  const { data, error } = await supabase
    .from('registro_custos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating registro custo:', error)
    return null
  }

  return data
}

export async function deleteRegistroCusto(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('registro_custos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting registro custo:', error)
    return false
  }

  return true
}

export async function getRegistrosCustosPorMes(ano: number, mes: number): Promise<RegistroCusto[]> {
  const inicioMes = new Date(ano, mes - 1, 1).toISOString().split('T')[0]
  const fimMes = new Date(ano, mes, 0).toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('registro_custos')
    .select('*')
    .gte('data', inicioMes)
    .lte('data', fimMes)
    .order('data', { ascending: false })

  if (error) {
    console.error('Error fetching custos por mês:', error)
    return []
  }

  return data || []
}