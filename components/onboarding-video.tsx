'use client'

import * as React from 'react'
import { IconPlayerPlay, IconCheck, IconClock, IconBuilding } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface OnboardingVideoProps {
  onComplete: () => void
}

export function OnboardingVideo({ onComplete }: OnboardingVideoProps) {
  const [videoProgress, setVideoProgress] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [videoCompleted, setVideoCompleted] = React.useState(false)

  // Simular progresso do vídeo
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && videoProgress < 100) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            setVideoCompleted(true)
            setIsPlaying(false)
            onComplete()
            return 100
          }
          return newProgress
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, videoProgress, onComplete])

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  const handlePauseVideo = () => {
    setIsPlaying(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🎬 Apresentação da Empresa</CardTitle>
          <p className="text-muted-foreground">
            Conheça nossa história, missão, visão e valores
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Player */}
          <div className="relative">
            <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
              {/* Video placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                {!isPlaying && !videoCompleted ? (
                  <Button
                    size="lg"
                    onClick={handlePlayVideo}
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    <IconPlayerPlay className="w-8 h-8 mr-2" />
                    Assistir Apresentação
                  </Button>
                ) : videoCompleted ? (
                  <div className="text-center text-white">
                    <IconCheck className="w-16 h-16 mx-auto mb-4 text-green-400" />
                    <h3 className="text-xl font-semibold mb-2">Vídeo Concluído!</h3>
                    <p>Você pode prosseguir para a próxima etapa</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <IconClock className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Reproduzindo...</h3>
                    <Button
                      variant="outline"
                      onClick={handlePauseVideo}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Pausar
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Progress bar */}
              {(isPlaying || videoCompleted) && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Progress value={videoProgress} className="w-full" />
                  <div className="flex justify-between text-white text-sm mt-1">
                    <span>{Math.round(videoProgress)}% assistido</span>
                    <span>Duração: 8:30</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Company info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconBuilding className="w-5 h-5 text-blue-600" />
                  Nossa História
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fundada em 2020, a Acme Inc nasceu com o objetivo de revolucionar 
                  o mercado de tecnologia através de soluções inovadoras.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  🎯 Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Desenvolver tecnologias que simplifiquem a vida das pessoas 
                  e impulsionem o crescimento dos negócios.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  🚀 Nossa Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ser referência global em inovação tecnológica, 
                  criando um futuro mais conectado e eficiente.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Video completion status */}
          {videoCompleted && (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <IconCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-400">
                Apresentação assistida com sucesso!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                Agora você conhece nossa empresa. Vamos para o próximo passo!
              </p>
            </div>
          )}

          {!videoCompleted && (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-700 dark:text-blue-400">
                Assista ao vídeo completo para continuar
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                Este vídeo apresenta informações importantes sobre nossa empresa
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}