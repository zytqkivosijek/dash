'use client'

import * as React from 'react'
import { IconBook, IconCheck, IconClock, IconHome, IconShirt, IconGavel } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface OnboardingManualProps {
  onComplete: () => void
}

const secoes = [
  {
    id: 'horarios',
    titulo: 'Horários de Trabalho',
    icone: IconClock,
    conteudo: [
      'Horário padrão: 9h às 18h (segunda a sexta)',
      'Intervalo para almoço: 12h às 13h',
      'Flexibilidade de 1h para entrada (8h às 10h)',
      'Home office: até 2 dias por semana (com aprovação)',
      'Reuniões obrigatórias: terças-feiras às 9h'
    ]
  },
  {
    id: 'dress-code',
    titulo: 'Dress Code',
    icone: IconShirt,
    conteudo: [
      'Ambiente casual: jeans, camisetas e tênis são bem-vindos',
      'Reuniões com clientes: business casual',
      'Sexta-feira: dress code livre',
      'Evitar: roupas com mensagens ofensivas',
      'Dúvidas? Consulte seu supervisor'
    ]
  },
  {
    id: 'home-office',
    titulo: 'Política de Home Office',
    icone: IconHome,
    conteudo: [
      'Máximo de 2 dias por semana',
      'Solicitar com 24h de antecedência',
      'Manter produtividade e disponibilidade',
      'Participar de todas as reuniões online',
      'Equipamentos da empresa podem ser levados'
    ]
  },
  {
    id: 'compliance',
    titulo: 'Código de Conduta',
    icone: IconGavel,
    conteudo: [
      'Respeito mútuo entre todos os colaboradores',
      'Confidencialidade de informações da empresa',
      'Uso responsável dos recursos corporativos',
      'Proibido assédio de qualquer natureza',
      'Denúncias: canal-etica@empresa.com'
    ]
  }
]

export function OnboardingManual({ onComplete }: OnboardingManualProps) {
  const [secoesLidas, setSecoesLidas] = React.useState<string[]>([])
  const [tempoLeitura, setTempoLeitura] = React.useState(0)

  // Simular tempo de leitura
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTempoLeitura(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSecaoLida = (secaoId: string, lida: boolean) => {
    if (lida) {
      setSecoesLidas(prev => [...prev, secaoId])
    } else {
      setSecoesLidas(prev => prev.filter(id => id !== secaoId))
    }
  }

  const todasSecoesLidas = secoes.every(secao => secoesLidas.includes(secao.id))
  const tempoMinimoLeitura = tempoLeitura >= 60 // 1 minuto mínimo

  React.useEffect(() => {
    if (todasSecoesLidas && tempoMinimoLeitura) {
      onComplete()
    }
  }, [todasSecoesLidas, tempoMinimoLeitura, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">📚 Manual do Colaborador</CardTitle>
          <p className="text-muted-foreground">
            Leia atentamente nossas políticas e procedimentos internos
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline">
              <IconClock className="w-4 h-4 mr-1" />
              Tempo de leitura: {formatTime(tempoLeitura)}
            </Badge>
            <Badge variant="outline">
              {secoesLidas.length} de {secoes.length} seções lidas
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {secoes.map((secao, index) => {
            const IconeSecao = secao.icone
            const foiLida = secoesLidas.includes(secao.id)
            
            return (
              <Card key={secao.id} className={`transition-all ${foiLida ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <IconeSecao className="w-5 h-5" />
                      {secao.titulo}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`secao-${secao.id}`}
                        checked={foiLida}
                        onCheckedChange={(checked) => handleSecaoLida(secao.id, !!checked)}
                      />
                      <Label htmlFor={`secao-${secao.id}`} className="text-sm">
                        Li e compreendi
                      </Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {secao.conteudo.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}

          <Separator />

          {/* Important notes */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                ⚠️ Importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• O não cumprimento das políticas pode resultar em advertência</li>
                <li>• Em caso de dúvidas, consulte sempre seu supervisor ou o RH</li>
                <li>• Estas políticas podem ser atualizadas periodicamente</li>
                <li>• Você receberá notificações sobre mudanças importantes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Completion status */}
          {todasSecoesLidas && tempoMinimoLeitura ? (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <IconCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-400">
                Manual lido com sucesso!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                Você está pronto para a próxima etapa
              </p>
            </div>
          ) : (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-700 dark:text-blue-400">
                {!todasSecoesLidas 
                  ? `Marque todas as seções como lidas (${secoes.length - secoesLidas.length} restantes)`
                  : `Continue lendo (tempo mínimo: 1 minuto)`
                }
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                É importante conhecer nossas políticas antes de prosseguir
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}