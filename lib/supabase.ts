import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oabmoptbhwqzpwxbnskk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hYm1vcHRiaHdxenB3eGJuc2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNzIwOTIsImV4cCI6MjA3MzY0ODA5Mn0.mWohmhZyFvMTCyYAU14R_1jw7qyy7Sh3_iDOs1ZRKx8'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper para verificar se o usuário está autenticado
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper para fazer login
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

// Helper para fazer registro
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

// Helper para fazer logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}