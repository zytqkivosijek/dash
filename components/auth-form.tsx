'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { login, register } from '@/lib/auth'

export function AuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('register')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const user = login(username, password)
      
      if (user) {
        setSuccess('Login realizado com sucesso!')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        setError('Credenciais inválidas. Use: admin/admin')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (password.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const user = register(username, email, password)
      
      if (user) {
        setSuccess('Conta criada com sucesso!')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      // Simular criação de conta com email
      const user = register(email.split('@')[0], email, 'temp123')
      
      if (user) {
        setSuccess('Conta criada com sucesso!')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {activeTab === 'register' ? 'Create an account' : 'Welcome back'}
        </h1>
        <p className="text-slate-400">
          {activeTab === 'register' 
            ? 'Enter your email below to create your account'
            : 'Enter your credentials to access your account'
          }
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        
        <TabsContent value="register" className="space-y-4">
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                disabled={isLoading}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign In with Email'}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            disabled={isLoading}
          >
            🔒 SAML SSO
          </Button>
          
          <div className="text-center text-xs text-slate-400 mt-6">
            By clicking continue, you agree to our{' '}
            <a href="#" className="underline hover:text-white">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-white">Privacy Policy</a>.
          </div>
          
          <div className="text-center text-sm text-slate-400 mt-4">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => setActiveTab('login')}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Sign in
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="login" className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="username"
                type="text"
                placeholder="Username"
                required
                disabled={isLoading}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                disabled={isLoading}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="text-center text-sm text-slate-400 mt-4">
            <p className="mb-2">Credenciais padrão:</p>
            <p><strong className="text-white">Usuário:</strong> admin</p>
            <p><strong className="text-white">Senha:</strong> admin</p>
          </div>
          
          <div className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => setActiveTab('register')}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Sign up
            </button>
          </div>
        </TabsContent>
      </Tabs>
      
      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 text-sm text-green-400 bg-green-900/20 p-3 rounded-md border border-green-800">
          {success}
        </div>
      )}
    </div>
  )
}