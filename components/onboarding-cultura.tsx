'use client'

import * as React from 'react'
import { IconHeart, IconCheck, IconX, IconRefresh, IconTrophy } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { QuizQuestion } from '@/types/onboarding'

interface OnboardingCulturaProps {
  onComplete: () => void
}

const valores = [
  {
    titulo: 'Inovação',
    descricao: 'Buscamos constantemente novas formas de resolver problemas e criar valor.',
    icone: '💡'
  },
  {
    titulo: 'Colaboração',
    descricao: 'Acreditamos que juntos somos mais fortes e alcançamos melhores resultados.',
    icone: '🤝'
  },
  {
    titulo: 'Transparência',
    descricao: 'Comunicação clara e honesta é a base de todas as nossas relações.',
    icone: '🔍'
  },
  {
    titulo: 'Excelência',
    descricao: 'Comprometemo-nos com a qualidade em tudo que fazemos.',
    icone: '⭐'
  },
  {
    titulo: 'Sustentabilidade',
    descricao: 'Pensamos no impacto de nossas ações para as futuras gerações.',
    icone: '🌱'
  }
]

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Qual é o principal valor que guia nossa busca por soluções criativas?",
    opcoes: ["Transparência", "Inovação", "Colaboração", "Excelência"],
    respostaCorreta: 1,
    explicacao: "A Inovação é nosso valor central para encontrar novas formas de resolver problemas."
  },
  {
    id: 2,
    pergunta: "Como devemos abordar os projetos em equipe?",
    opcoes: ["Individualmente", "Com colaboração", "Competindo", "Isoladamente"],
    respostaCorreta: 1,
    explicacao: "A Colaboração é fundamental - juntos somos mais fortes e alcançamos melhores resultados."
  },
  {
    id: 3,
    pergunta: "Qual valor orienta nossa comunicação interna e externa?",
    opcoes: ["Inovação", "Sustentabilidade", "Transparência", "Excelência"],
    respostaCorreta: 2,
    explicacao: "A Transparência garante que nossa comunicação seja sempre clara e honesta."
  },
  {
    id: 4,
    pergunta: "Como pensamos sobre o impacto de nossas ações?",
    opcoes: ["Apenas no presente", "Para as futuras gerações", "Só nos lucros", "Não pensamos"],
    respostaCorreta: 1,
    explicacao: "A Sustentabilidade nos faz pensar no impacto para as futuras gerações."
  },
  {
    id: 5,
    pergunta: "Qual é nosso compromisso com a qualidade?",
    opcoes: ["Fazer o mínimo", "Buscar excelência", "Fazer rápido", "Não importa"],
    respostaCorreta: 1,
    explicacao: "A Excelência significa comprometimento com a qualidade em tudo que fazemos."
  }
]

export function OnboardingCultura({ onComplete }: OnboardingCulturaProps) {
  const [etapaAtual, setEtapaAtual] = React.useState<'valores' | 'quiz'>('valores')
  const [valoresLidos, setValoresLidos] = React.useState<string[]>([])
  const [quizIniciado, setQuizIniciado] = React.useState(false)
  const [perguntaAtual, setPerguntaAtual] = React.useState(0)
  const [respostas, setRespostas] = React.useState<number[]>([])
  const [respostaSelecionada, setRespostaSelecionada] = React.useState<number | null>(null)
  const [mostrarExplicacao, setMostrarExplicacao] = React.useState(false)
  const [quizCompleto, setQuizCompleto] = React.useState(false)
  const [pontuacao, setPontuacao] = React.useState(0)

  const handleValorLido = (titulo: string, lido: boolean) => {
    if (lido) {
      setValoresLidos(prev => [...prev, titulo])
    } else {
      setValoresLidos(prev => prev.filter(t => t !== titulo))
    }
  }

  const todosValoresLidos = valores.every(valor => valoresLidos.includes(valor.titulo))

  const handleIniciarQuiz = () => {
    setQuizIniciado(true)
    setEtapaAtual('quiz')
  }

  const handleResponderPergunta = (opcaoIndex: number) => {
    setRespostaSelecionada(opcaoIndex)
    setMostrarExplicacao(true)
    
    const novasRespostas = [...respostas, opcaoIndex]
    setRespostas(novasRespostas)
    
    if (opcaoIndex === quizQuestions[perguntaAtual].respostaCorreta) {
      setPontuacao(prev => prev + 1)
    }
  }

  const handleProximaPergunta = () => {
    if (perguntaAtual < quizQuestions.length - 1) {
      setPerguntaAtual(prev => prev + 1)
      setRespostaSelecionada(null)
      setMostrarExplicacao(false)
    } else {
      setQuizCompleto(true)
      onComplete()
    }
  }

  const handleReiniciarQuiz = () => {
    setPerguntaAtual(0)
    setRespostas([])
    setRespostaSelecionada(null)
    setMostrarExplicacao(false)
    setQuizCompleto(false)
    setPontuacao(0)
  }

  const porcentagemAcerto = quizCompleto ? Math.round((pontuacao / quizQuestions.length) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">❤️ Cultura e Valores</CardTitle>
          <p className="text-muted-foreground">
            Conheça nossos valores fundamentais e teste seus conhecimentos
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {etapaAtual === 'valores' && (
            <>
              {/* Valores da empresa */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center mb-6">Nossos Valores Fundamentais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {valores.map((valor) => (
                    <Card key={valor.titulo} className={`transition-all ${valoresLidos.includes(valor.titulo) ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span className="text-2xl">{valor.icone}</span>
                            {valor.titulo}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`valor-${valor.titulo}`}
                              checked={valoresLidos.includes(valor.titulo)}
                              onCheckedChange={(checked) => handleValorLido(valor.titulo, !!checked)}
                            />
                            <Label htmlFor={`valor-${valor.titulo}`} className="text-sm">
                              Li
                            </Label>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{valor.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Botão para iniciar quiz */}
              <div className="text-center">
                {todosValoresLidos ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <IconCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-700 dark:text-green-400">
                        Valores lidos com sucesso!
                      </p>
                    </div>
                    <Button onClick={handleIniciarQuiz} size="lg">
                      <IconTrophy className="w-5 h-5 mr-2" />
                      Iniciar Quiz sobre Cultura
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-medium text-blue-700 dark:text-blue-400">
                      Marque todos os valores como lidos para prosseguir
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-500">
                      Faltam {valores.length - valoresLidos.length} valores para ler
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {etapaAtual === 'quiz' && !quizCompleto && (
            <div className="space-y-6">
              {/* Quiz header */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Quiz sobre Cultura e Valores</h3>
                <Progress value={((perguntaAtual + 1) / quizQuestions.length) * 100} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">
                  Pergunta {perguntaAtual + 1} de {quizQuestions.length}
                </p>
              </div>

              {/* Current question */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {quizQuestions[perguntaAtual].pergunta}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quizQuestions[perguntaAtual].opcoes.map((opcao, index) => (
                    <button
                      key={index}
                      onClick={() => !mostrarExplicacao && handleResponderPergunta(index)}
                      disabled={mostrarExplicacao}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        mostrarExplicacao
                          ? index === quizQuestions[perguntaAtual].respostaCorreta
                            ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400'
                            : index === respostaSelecionada && index !== quizQuestions[perguntaAtual].respostaCorreta
                            ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400'
                            : 'bg-muted'
                          : respostaSelecionada === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm font-medium">
                          {String.fromCharCode(65 + index)}
                        </div>
                        {opcao}
                        {mostrarExplicacao && index === quizQuestions[perguntaAtual].respostaCorreta && (
                          <IconCheck className="w-5 h-5 ml-auto" />
                        )}
                        {mostrarExplicacao && index === respostaSelecionada && index !== quizQuestions[perguntaAtual].respostaCorreta && (
                          <IconX className="w-5 h-5 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}

                  {mostrarExplicacao && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm">
                        <strong>Explicação:</strong> {quizQuestions[perguntaAtual].explicacao}
                      </p>
                    </div>
                  )}

                  {mostrarExplicacao && (
                    <div className="flex justify-center mt-4">
                      <Button onClick={handleProximaPergunta}>
                        {perguntaAtual < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
                        <IconCheck className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {quizCompleto && (
            <div className="space-y-6">
              {/* Quiz results */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <IconTrophy className="w-8 h-8 text-yellow-500" />
                    Quiz Concluído!
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-green-600">
                      {pontuacao}/{quizQuestions.length}
                    </div>
                    <p className="text-lg font-medium">
                      {porcentagemAcerto}% de acertos
                    </p>
                  </div>

                  <div className="space-y-2">
                    {porcentagemAcerto >= 80 ? (
                      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <p className="font-medium text-green-700 dark:text-green-400">
                          🎉 Excelente! Você demonstrou ótimo conhecimento sobre nossa cultura!
                        </p>
                      </div>
                    ) : porcentagemAcerto >= 60 ? (
                      <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <p className="font-medium text-yellow-700 dark:text-yellow-400">
                          👍 Bom trabalho! Você tem uma boa compreensão dos nossos valores.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <p className="font-medium text-red-700 dark:text-red-400">
                          📚 Recomendamos revisar nossos valores antes de prosseguir.
                        </p>
                        <Button
                          variant="outline"
                          onClick={handleReiniciarQuiz}
                          className="mt-2"
                        >
                          <IconRefresh className="w-4 h-4 mr-2" />
                          Refazer Quiz
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="font-medium text-primary">
                      Você está pronto para a próxima etapa!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vamos configurar seus acessos aos sistemas da empresa
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}