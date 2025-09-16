import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default function HomePage() {
  // Verificar se está no lado do cliente
  if (typeof window !== 'undefined') {
    if (isAuthenticated()) {
      redirect('/dashboard')
    } else {
      redirect('/auth')
    }
  }
  
  // Fallback para renderização do servidor
  redirect('/auth')
}