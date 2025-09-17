import { supabase } from './supabase'
import { Database } from '@/types/database'

type ColaboradorDB = Database['public']['Tables']['colaboradores']['Row']
type ColaboradorInsert = Database['public']['Tables']['colaboradores']['Insert']
type ColaboradorUpdate = Database['public']['Tables']['colaboradores']['Update']
type HistoricoAlteracao = Database['public']['Tables']['historico_alteracoes']['Row']

export async function getColaboradores(): Promise<ColaboradorDB[]> {
  const { data, error } = await supabase
    .from('colaboradores')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching colaboradores:', error)
    return []
  }

  return data || []
}

export async function createColaborador(colaborador: Omit<ColaboradorInsert, 'user_id'>): Promise<ColaboradorDB | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('colaboradores')
    .insert({
      ...colaborador,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating colaborador:', error)
    return null
  }

  // Criar log de histórico
  await createHistoricoAlteracao(data.id, 'Admissão', 'Colaborador adicionado ao sistema', user.email || 'Sistema')

  return data
}

export async function updateColaborador(id: string, updates: ColaboradorUpdate): Promise<ColaboradorDB | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('colaboradores')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating colaborador:', error)
    return null
  }

  // Criar log de histórico
  if (user) {
    await createHistoricoAlteracao(id, 'Atualização', 'Dados do colaborador foram atualizados', user.email || 'Sistema')
  }

  return data
}

export async function deleteColaborador(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('colaboradores')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting colaborador:', error)
    return false
  }

  return true
}

export async function getHistoricoAlteracoes(colaboradorId: string): Promise<HistoricoAlteracao[]> {
  const { data, error } = await supabase
    .from('historico_alteracoes')
    .select('*')
    .eq('colaborador_id', colaboradorId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching historico:', error)
    return []
  }

  return data || []
}

export async function createHistoricoAlteracao(
  colaboradorId: string, 
  acao: string, 
  detalhes: string, 
  usuarioResponsavel: string
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { error } = await supabase
    .from('historico_alteracoes')
    .insert({
      colaborador_id: colaboradorId,
      acao,
      detalhes,
      usuario_responsavel: usuarioResponsavel,
      user_id: user.id
    })

  if (error) {
    console.error('Error creating historico:', error)
  }
}