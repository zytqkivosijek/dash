import { supabase } from './supabase'
import { Database } from '@/types/database'

type DocumentoDB = Database['public']['Tables']['documentos']['Row']
type DocumentoInsert = Database['public']['Tables']['documentos']['Insert']
type DocumentoUpdate = Database['public']['Tables']['documentos']['Update']

type AcessoDB = Database['public']['Tables']['acessos']['Row']
type AcessoInsert = Database['public']['Tables']['acessos']['Insert']
type AcessoUpdate = Database['public']['Tables']['acessos']['Update']

type LogAcesso = Database['public']['Tables']['logs_acesso']['Row']

// Serviços para Documentos
export async function getDocumentos(): Promise<DocumentoDB[]> {
  const { data, error } = await supabase
    .from('documentos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching documentos:', error)
    return []
  }

  return data || []
}

export async function createDocumento(documento: Omit<DocumentoInsert, 'user_id'>): Promise<DocumentoDB | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('documentos')
    .insert({
      ...documento,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating documento:', error)
    return null
  }

  return data
}

export async function updateDocumento(id: string, updates: DocumentoUpdate): Promise<DocumentoDB | null> {
  const { data, error } = await supabase
    .from('documentos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating documento:', error)
    return null
  }

  return data
}

export async function deleteDocumento(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('documentos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting documento:', error)
    return false
  }

  return true
}

// Serviços para Acessos
export async function getAcessos(): Promise<AcessoDB[]> {
  const { data, error } = await supabase
    .from('acessos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching acessos:', error)
    return []
  }

  return data || []
}

export async function createAcesso(acesso: Omit<AcessoInsert, 'user_id'>): Promise<AcessoDB | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('acessos')
    .insert({
      ...acesso,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating acesso:', error)
    return null
  }

  return data
}

export async function updateAcesso(id: string, updates: AcessoUpdate): Promise<AcessoDB | null> {
  const { data, error } = await supabase
    .from('acessos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating acesso:', error)
    return null
  }

  return data
}

export async function deleteAcesso(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('acessos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting acesso:', error)
    return false
  }

  return true
}

// Serviços para Logs de Acesso
export async function getLogsAcesso(documentoId?: string): Promise<LogAcesso[]> {
  let query = supabase
    .from('logs_acesso')
    .select('*')
    .order('created_at', { ascending: false })

  if (documentoId) {
    query = query.eq('documento_id', documentoId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching logs:', error)
    return []
  }

  return data || []
}

export async function createLogAcesso(
  documentoId: string,
  acao: 'Visualizar' | 'Baixar' | 'Editar' | 'Excluir',
  usuario: string,
  ipAddress?: string
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { error } = await supabase
    .from('logs_acesso')
    .insert({
      documento_id: documentoId,
      usuario,
      acao,
      ip_address: ipAddress,
      user_id: user.id
    })

  if (error) {
    console.error('Error creating log:', error)
  }
}

// Incrementar contador de acessos
export async function incrementarAcessos(documentoId: string): Promise<void> {
  const { data: documento } = await supabase
    .from('documentos')
    .select('acessos')
    .eq('id', documentoId)
    .single()

  if (documento) {
    await updateDocumento(documentoId, {
      acessos: (documento.acessos || 0) + 1,
      ultimo_acesso: new Date().toISOString()
    })
  }
}