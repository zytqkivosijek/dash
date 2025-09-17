export interface Colaborador {
  id: number
  nome: string
  cpfCnpj: string
  rg: string
  dataNascimento: string
  telefone: string
  email: string
  emailCorporativo: string
  estadoCivil: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    pais: string
  }
  cargo: string
  departamento: string
  tipoContrato: 'CLT' | 'PJ' | 'Freelancer' | 'Estágio'
  dataAdmissao: string
  dataDesligamento?: string
  matricula: string
  supervisor: string
  salarioBase: number
  beneficios: number
  descontos: number
  formaPagamento: string
  chavePix?: string
  enderecoUsdt?: string
  banco?: string
  agencia?: string
  conta?: string
  status: 'Ativo' | 'Inativo' | 'Em experiência'
}

export interface HistoricoAlteracao {
  id: number
  data: string
  acao: string
  usuario: string
  detalhes: string
}

export const tiposContrato = [
  { value: 'CLT', label: 'CLT', icon: '👔' },
  { value: 'PJ', label: 'PJ', icon: '💼' },
  { value: 'Freelancer', label: 'Freelancer', icon: '🎯' },
  { value: 'Estágio', label: 'Estágio', icon: '🎓' }
] as const

export const statusOptions = ['Ativo', 'Inativo', 'Em experiência'] as const
export const departamentos = ['Tecnologia', 'Marketing', 'Vendas', 'RH', 'Financeiro'] as const
export const formasPagamento = ['PIX', 'Transferência Bancária', 'USDT', 'Carteira Digital'] as const