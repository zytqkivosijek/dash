'use client'

import * as React from 'react'
import { IconCheck, IconExternalLink, IconMail, IconBrandSlack, IconCode, IconChartBar, IconKey, IconCopy } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { AcessoSistema } from '@/types/onboarding'

interface OnboardingAcessosProps {
  onComplete: () => void
}

const sistemasEmpresa: AcessoSistema[] = [
  {
    id: 'email',
    nome: 'E-mail Corporativo',
    tipo: 'Email',
    url: 'https://mail.google.com',
    instrucoes: 'Acesse com seu e-mail corporativo. Senha temporária será enviada por SMS.',
    configurado: false,
    icone: '📧'
  },
  {
    id: 'slack',
    nome: 'Slack da Empresa',
    tipo: 'Slack',
    url: 'https://acme-inc.slack.com',
    instrucoes: 'Use seu e-mail corporativo para fazer login. Você será adicionado automaticamente aos canais relevantes.',
    configurado: false,
    icone: '💬'
  },
  {
    id: 'github',
    nome: 'GitHub Organization',
    tipo: 'Software',
    url: 'https://github.com/acme-inc',
    instrucoes: 'Informe seu usuário GitHub para ser adicionado à organização da empresa.',
    configurado: false,
    icone: '🐙'
  },
  {
    id: 'jira',
    nome: 'Jira - Gestão de Projetos',
    tipo: 'Ferramenta',
    url: 'https://acme-inc.atlassian.net',
    instrucoes: 'Sistema para acompanhar tarefas e projetos. Login com e-mail corporativo.',
    configurado: false,
    icone: '📋'
  },
  {
    id: 'figma',
    nome: 'Figma - Design',
    tipo: 'Software',
    url: 'https://figma.com',
    instrucoes: 'Ferramenta de design colaborativo. Você será adicionado aos projetos relevantes.',
    configurado: false,
    icone: '🎨'
  }
]

export function OnboardingAcessos({ onComplete }: OnboardingAcessosProps) {
  const [sistemas, setSistemas] = React.useState<AcessoSistema[]>(sistemasEmpresa)
  const [dadosUsuario, setDadosUsuario] = React.useState({
    usuarioGithub: '',
    telefone: '',
    observacoes: ''
  })

  const handleConfigurarSistema = (sistemaId: string) => {
    setSistemas(prev => 
      prev.map(sistema => 
        sistema.id === sistemaId 
          ? { ...sistema, configurado: true }
          : sistema
      )
    )
  }

  const sistemasConfigurados = sistemas.filter(s => s.configurado).length
  const todosConfigurados = sistemasConfigurados === sistemas.length

  React.useEffect(() => {
    if (todosConfigurados) {
      onComplete()
    }
  }, [todosConfigurados, onComplete])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">⚙️ Configuração de Acessos</CardTitle>
          <p className="text-muted-foreground">
            Configure suas contas nos sistemas da empresa
          </p>
          <Badge variant="outline" className="mt-2">
            {sistemasConfigurados} de {sistemas.length} sistemas configurados
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dados do usuário */}
          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-lg">📝 Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="usuario-github">Usuário GitHub</Label>
                  <Input
                    id="usuario-github"
                    value={dadosUsuario.usuarioGithub}
                    onChange={(e) => setDadosUsuario(prev => ({ ...prev, usuarioGithub: e.target.value }))}
                    placeholder="seu-usuario-github"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone (para SMS)</Label>
                  <Input
                    id="telefone"
                    value={dadosUsuario.telefone}
                    onChange={(e) => setDadosUsuario(prev => ({ ...prev, telefone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sistemas para configurar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sistemas da Empresa</h3>
            
            {sistemas.map((sistema) => (
              <Card key={sistema.id} className={`transition-all ${sistema.configurado ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-2xl">{sistema.icone}</span>
                      {sistema.nome}
                      <Badge variant="secondary" className="text-xs">
                        {sistema.tipo}
                      </Badge>
                    </CardTitle>
                    {sistema.configurado ? (
                      <Badge className="bg-green-500 text-white">
                        <IconCheck className="w-4 h-4 mr-1" />
                        Configurado
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Pendente
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {sistema.instrucoes}
                  </p>
                  
                  {sistema.url && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <IconExternalLink className="w-4 h-4" />
                      <span className="font-mono text-sm flex-1">{sistema.url}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(sistema.url!)}
                      >
                        <IconCopy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(sistema.url, '_blank')}
                      >
                        <IconExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {sistema.configurado 
                        ? 'Sistema configurado e pronto para uso'
                        : 'Clique em "Configurar" após acessar o sistema'
                      }
                    </div>
                    <Button
                      onClick={() => handleConfigurarSistema(sistema.id)}
                      disabled={sistema.configurado}
                      variant={sistema.configurado ? "outline" : "default"}
                    >
                      {sistema.configurado ? (
                        <>
                          <IconCheck className="w-4 h-4 mr-2" />
                          Configurado
                        </>
                      ) : (
                        'Marcar como Configurado'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Guia de primeiros passos */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                💡 Primeiros Passos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Configure seu perfil em cada sistema com foto e informações</li>
                <li>• Junte-se aos canais do Slack do seu departamento</li>
                <li>• Explore os projetos no GitHub e Jira</li>
                <li>• Configure notificações conforme sua preferência</li>
                <li>• Em caso de problemas, contate o suporte: suporte@empresa.com</li>
              </ul>
            </CardContent>
          </Card>

          {/* Completion status */}
          {todosConfigurados ? (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <IconCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-400">
                Todos os acessos foram configurados!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                Você está pronto para finalizar o onboarding
              </p>
            </div>
          ) : (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-700 dark:text-blue-400">
                Configure todos os sistemas para continuar
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                Faltam {sistemas.length - sistemasConfigurados} sistemas para configurar
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}