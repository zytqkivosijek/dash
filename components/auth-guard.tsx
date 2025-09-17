'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChange, User } from '@/lib/auth'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user)
      if (!user) {
        router.push('/auth')
      } else {
        setIsLoading(false)
      }
    })
    
    return () => unsubscribe()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}