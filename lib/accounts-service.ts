import { supabase } from './supabase'
import { Database } from '@/types/database'

type Account = Database['public']['Tables']['accounts']['Row']
type AccountInsert = Database['public']['Tables']['accounts']['Insert']
type AccountUpdate = Database['public']['Tables']['accounts']['Update']

export async function getAccounts(): Promise<Account[]> {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accounts:', error)
    return []
  }

  return data || []
}

export async function createAccount(account: Omit<AccountInsert, 'user_id'>): Promise<Account | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('accounts')
    .insert({
      ...account,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating account:', error)
    return null
  }

  return data
}

export async function updateAccount(id: string, updates: AccountUpdate): Promise<Account | null> {
  const { data, error } = await supabase
    .from('accounts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating account:', error)
    return null
  }

  return data
}

export async function deleteAccount(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting account:', error)
    return false
  }

  return true
}

export async function updateAccountPercentages(accounts: Account[]): Promise<void> {
  const total = accounts.reduce((sum, account) => sum + account.value, 0)
  
  const updates = accounts.map(account => ({
    id: account.id,
    percentage: total > 0 ? Number(((account.value / total) * 100).toFixed(1)) : 0
  }))

  for (const update of updates) {
    await updateAccount(update.id, { percentage: update.percentage })
  }
}