export interface Documento {
  id: number
  nome: string
  tipo: 'Documento' | 'Planilha' | 'Acesso'
  categoria: string
  descricao: string
  arquivo?: string
  url?: string
  tamanho?: string
  dataUpload: string
  dataModificacao: string
  responsavel: string
  tags: string[]
  permissoes: {
    visualizar: string[]
    editar: string[]
    excluir: string[]
  }
  status: 'Ativo' | 'Arquivado' | 'Restrito'
  acessos?: number
  ultimoAcesso?: string
}

export interface Acesso {
  id: number
  nome: string
  categoria: string
  url?: string
  usuario?: string
  senha?: string
  apiKey?: string
  token?: string
  descricao: string
  tags: string[]
  dataAtualizacao: string
  responsavel: string
  status: 'Ativo' | 'Inativo' | 'Expirado'
}

export interface LogAcesso {
  id: number
  documentoId: number
  usuario: string
  acao: 'Visualizar' | 'Baixar' | 'Editar' | 'Excluir'
  data: string
  ip?: string
}

export const tiposDocumento = [
  { value: 'Documento', label: 'Documento', icon: '📄' },
  { value: 'Planilha', label: 'Planilha', icon: '📊' },
  { value: 'Acesso', label: 'Acesso', icon: '🔐' }
] as const

export const categoriasDocumento = [
  'Contratos',
  'Políticas',
  'Relatórios',
  'Financeiro',
  'RH',
  'Projetos',
  'Compliance',
  'Operacional'
] as const

export const categoriasAcesso = [
  'Sistemas Corporativos',
  'APIs e Tokens',
  'Bancos de Dados',
  'Serviços Cloud',
  'Redes Sociais',
  'Ferramentas de Marketing',
  'Desenvolvimento',
  'Outros'
] as const

export const statusOptions = ['Ativo', 'Arquivado', 'Restrito'] as const