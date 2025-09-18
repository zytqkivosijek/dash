export interface OnboardingStep {
  id: number
  title: string
  description: string
  completed: boolean
}

export interface DocumentoUpload {
  id: string
  nome: string
  tipo: 'RG' | 'CPF' | 'Comprovante Residência' | 'Dados Bancários' | 'Outros'
  arquivo: File | null
  status: 'pending' | 'uploaded' | 'approved' | 'rejected'
  observacoes?: string
}

export interface QuizQuestion {
  id: number
  pergunta: string
  opcoes: string[]
  respostaCorreta: number
  explicacao: string
}

export interface AcessoSistema {
  id: string
  nome: string
  tipo: 'Email' | 'Slack' | 'Teams' | 'Software' | 'Ferramenta'
  url?: string
  instrucoes: string
  configurado: boolean
  icone: string
}

export interface OnboardingData {
  colaboradorId: number
  etapaAtual: number
  documentos: DocumentoUpload[]
  videoAssistido: boolean
  manualLido: boolean
  quizCompleto: boolean
  pontuacaoQuiz: number
  acessosConfigurados: string[]
  dataInicio: string
  dataFinalizacao?: string
  status: 'em_andamento' | 'concluido' | 'pendente'
}