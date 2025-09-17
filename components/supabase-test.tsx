'use client'

import * as React from 'react'
import { IconCheck, IconX, IconLoader, IconDatabase, IconUser, IconKey } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase, getCurrentUser } from '@/lib/supabase'

interface TestResult {
  name: string
  status: 'loading' | 'success' | 'error'
  message: string
  details?: string
}

export function SupabaseTest() {
  const [tests, setTests] = React.useState<TestResult[]>([
    { name: 'Conexão com Supabase', status: 'loading', message: 'Testando...' },
    { name: 'Autenticação', status: 'loading', message: 'Verificando...' },
    { name: 'Tabela accounts', status: 'loading', message: 'Verificando...' },
    { name: 'Tabela costs', status: 'loading', message: 'Verificando...' },
    { name: 'Tabela colaboradores', status: 'loading', message: 'Verificando...' },
    { name: 'Tabela documentos', status: 'loading', message: 'Verificando...' },
    { name: 'Operação CRUD', status: 'loading', message: 'Testando...' }
  ])

  const [isRunning, setIsRunning] = React.useState(false)

  const updateTest = (index: number, status: TestResult['status'], message: string, details?: string) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, status, message, details } : test
    ))
  }

  const runTests = async () => {
    setIsRunning(true)
    
    // Reset all tests
    setTests(prev => prev.map(test => ({ ...test, status: 'loading' as const, message: 'Testando...' })))

    try {
      // Test 1: Conexão com Supabase
      try {
        const { data, error } = await supabase.from('accounts').select('count', { count: 'exact', head: true })
        if (error) throw error
        updateTest(0, 'success', 'Conexão estabelecida', `Supabase conectado com sucesso`)
      } catch (error: any) {
        updateTest(0, 'error', 'Falha na conexão', error.message)
        setIsRunning(false)
        return
      }

      // Test 2: Autenticação
      try {
        const user = await getCurrentUser()
        if (user) {
          updateTest(1, 'success', 'Usuário autenticado', `ID: ${user.id.substring(0, 8)}...`)
        } else {
          updateTest(1, 'error', 'Usuário não autenticado', 'Faça login para continuar os testes')
          setIsRunning(false)
          return
        }
      } catch (error: any) {
        updateTest(1, 'error', 'Erro na autenticação', error.message)
        setIsRunning(false)
        return
      }

      // Test 3: Tabela accounts
      try {
        const { data, error } = await supabase.from('accounts').select('*').limit(1)
        if (error) throw error
        updateTest(2, 'success', 'Tabela accounts OK', `${data?.length || 0} registros encontrados`)
      } catch (error: any) {
        updateTest(2, 'error', 'Tabela accounts não encontrada', error.message)
      }

      // Test 4: Tabela costs
      try {
        const { data, error } = await supabase.from('costs').select('*').limit(1)
        if (error) throw error
        updateTest(3, 'success', 'Tabela costs OK', `${data?.length || 0} registros encontrados`)
      } catch (error: any) {
        updateTest(3, 'error', 'Tabela costs não encontrada', error.message)
      }

      // Test 5: Tabela colaboradores
      try {
        const { data, error } = await supabase.from('colaboradores').select('*').limit(1)
        if (error) throw error
        updateTest(4, 'success', 'Tabela colaboradores OK', `${data?.length || 0} registros encontrados`)
      } catch (error: any) {
        updateTest(4, 'error', 'Tabela colaboradores não encontrada', error.message)
      }

      // Test 6: Tabela documentos
      try {
        const { data, error } = await supabase.from('documentos').select('*').limit(1)
        if (error) throw error
        updateTest(5, 'success', 'Tabela documentos OK', `${data?.length || 0} registros encontrados`)
      } catch (error: any) {
        updateTest(5, 'error', 'Tabela documentos não encontrada', error.message)
      }

      // Test 7: Operação CRUD (apenas se autenticado)
      try {
        // Tentar criar uma conta de teste
        const { data: insertData, error: insertError } = await supabase
          .from('accounts')
          .insert({
            name: 'Teste de Conexão',
            value: 100.00,
            color: 'bg-blue-500'
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Tentar atualizar
        const { error: updateError } = await supabase
          .from('accounts')
          .update({ value: 150.00 })
          .eq('id', insertData.id)

        if (updateError) throw updateError

        // Tentar deletar
        const { error: deleteError } = await supabase
          .from('accounts')
          .delete()
          .eq('id', insertData.id)

        if (deleteError) throw deleteError

        updateTest(6, 'success', 'CRUD funcionando', 'Create, Read, Update, Delete testados com sucesso')
      } catch (error: any) {
        updateTest(6, 'error', 'Erro nas operações CRUD', error.message)
      }

    } catch (error: any) {
      console.error('Erro geral nos testes:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'loading':
        return <IconLoader className="w-4 h-4 animate-spin text-blue-500" />
      case 'success':
        return <IconCheck className="w-4 h-4 text-green-500" />
      case 'error':
        return <IconX className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'loading':
        return <Badge variant="outline" className="text-blue-600">Testando</Badge>
      case 'success':
        return <Badge className="bg-green-500 text-white">Sucesso</Badge>
      case 'error':
        return <Badge variant="destructive">Erro</Badge>
    }
  }

  const successCount = tests.filter(t => t.status === 'success').length
  const errorCount = tests.filter(t => t.status === 'error').length
  const totalTests = tests.length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconDatabase className="w-5 h-5" />
            Verificação da Integração Supabase
          </CardTitle>
          <CardDescription>
            Teste completo da conexão e funcionalidades do banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{successCount}</div>
                <div className="text-xs text-muted-foreground">Sucessos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Erros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalTests}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="min-w-32"
            >
              {isRunning ? (
                <>
                  <IconLoader className="w-4 h-4 mr-2 animate-spin" />
                  Testando...
                </>
              ) : (
                'Executar Testes'
              )}
            </Button>
          </div>

          <div className="space-y-3">
            {tests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.message}</div>
                    {test.details && (
                      <div className="text-xs text-muted-foreground mt-1">{test.details}</div>
                    )}
                  </div>
                </div>
                {getStatusBadge(test.status)}
              </div>
            ))}
          </div>

          {errorCount > 0 && !isRunning && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Problemas Detectados
              </h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                {tests.filter(t => t.status === 'error').map((test, index) => (
                  <li key={index}>• {test.name}: {test.message}</li>
                ))}
              </ul>
            </div>
          )}

          {successCount === totalTests && !isRunning && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                ✅ Integração Completa!
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Todas as funcionalidades do Supabase estão funcionando corretamente. 
                Você pode usar o sistema com dados reais e persistentes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Conexão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">URL do Supabase:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não configurado'}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Chave Anônima:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '••••••••' : 'Não configurado'}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status da Conexão:</span>
            <Badge variant={successCount > 0 ? "default" : "destructive"}>
              {successCount > 0 ? 'Conectado' : 'Desconectado'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}