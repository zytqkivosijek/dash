import { supabase } from './supabase'
import { Database } from '@/types/database'

type Cost = Database['public']['Tables']['costs']['Row']
type CostInsert = Database['public']['Tables']['costs']['Insert']
type CostUpdate = Database['public']['Tables']['costs']['Update']

export async function getCosts(): Promise<Cost[]> {
  const { data, error } = await supabase
    .from('costs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching costs:', error)
    return []
  }

  return data || []
}

export async function createCost(cost: Omit<CostInsert, 'user_id'>): Promise<Cost | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('costs')
    .insert({
      ...cost,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating cost:', error)
    return null
  }

  return data
}

export async function updateCost(id: string, updates: CostUpdate): Promise<Cost | null> {
  const { data, error } = await supabase
    .from('costs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating cost:', error)
    return null
  }

  return data
}

export async function deleteCost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('costs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting cost:', error)
    return false
  }

  return true
}

export async function updateCostPercentages(costs: Cost[]): Promise<void> {
  const total = costs.reduce((sum, cost) => sum + cost.value, 0)
  
  const updates = costs.map(cost => ({
    id: cost.id,
    percentage: total > 0 ? Number(((cost.value / total) * 100).toFixed(1)) : 0
  }))

  for (const update of updates) {
    await updateCost(update.id, { percentage: update.percentage })
  }
}