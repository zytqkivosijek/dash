'use client'

import * as React from 'react'
import { IconCheck, IconChevronLeft, IconChevronRight, IconUser, IconVideo, IconBook, IconHeart, IconSettings } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { OnboardingDocumentacao } from '@/components/onboarding-documentacao'
import { OnboardingVideo } from '@/components/onboarding-video'
import { OnboardingManual } from '@/components/onboarding-manual'
import { OnboardingCultura } from '@/components/onboarding-cultura'
import { OnboardingAcessos } from '@/components/onboarding-acessos'
import { OnboardingStep } from '@/types/onboarding'

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Documentação",
    description: "Upload dos documentos necessários",
    completed: false
  },
  {
    id: 2,
    title: "Apresentação da Empresa",
    description: "Vídeo institucional e história",
    completed: false
  },
  {
    id: 3,
    title: "Manual do Colaborador",
    description: "Políticas e procedimentos internos",
    completed: false
  },
  {
    id: 4,
    title: "Cultura e Valores",
    description: "Quiz interativo sobre nossa cultura",
    completed: false
  },
  {
    id: 5,
    title: "Configuração de Acessos",
    description: "Setup de contas e sistemas",
    completed: false
  }
]

const stepIcons = [IconUser, IconVideo, IconBook, IconHeart, IconSettings]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])

  const progress = (completedSteps.length / steps.length) * 100

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = completedSteps.includes(currentStep)

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingDocumentacao onComplete={() => handleStepComplete(1)} />
      case 2:
        return <OnboardingVideo onComplete={() => handleStepComplete(2)} />
      case 3:
        return <OnboardingManual onComplete={() => handleStepComplete(3)} />
      case 4:
        return <OnboardingCultura onComplete={() => handleStepComplete(4)} />
      case 5:
        return <OnboardingAcessos onComplete={() => handleStepComplete(5)} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo à Acme Inc!</h1>
          <p className="text-muted-foreground text-lg">
            Vamos configurar tudo para você começar sua jornada conosco
          </p>
          <div className="mt-4">
            <Progress value={progress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">
              {completedSteps.length} de {steps.length} etapas concluídas
            </p>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const StepIcon = stepIcons[index]
              const isActive = currentStep === step.id
              const isCompleted = completedSteps.includes(step.id)
              
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all min-w-[120px] ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : isCompleted
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-muted hover:bg-accent'
                    }`}
                  >
                    <div className="relative">
                      <StepIcon className="w-6 h-6" />
                      {isCompleted && (
                        <IconCheck className="w-4 h-4 absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-border" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            <IconChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Etapa {currentStep} de {steps.length}
            </Badge>
          </div>

          {currentStep === steps.length ? (
            <Button
              onClick={() => {
                // Finalizar onboarding
                alert('Onboarding concluído! Redirecionando para o dashboard...')
                window.location.href = '/dashboard'
              }}
              disabled={!canProceed}
              className="bg-green-600 hover:bg-green-700"
            >
              Finalizar Onboarding
              <IconCheck className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              disabled={!canProceed}
            >
              Próximo
              <IconChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}