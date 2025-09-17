import { Colaborador, HistoricoAlteracao } from '@/types/colaborador'

export const colaboradoresData: Colaborador[] = [
  {
    id: 1,
    nome: "João Silva",
    cpfCnpj: "123.456.789-00",
    rg: "12.345.678-9",
    dataNascimento: "1990-05-15",
    telefone: "(11) 99999-1234",
    email: "joao.silva@email.com",
    emailCorporativo: "joao.silva@empresa.com",
    estadoCivil: "Casado",
    endereco: {
      rua: "Rua das Flores, 123",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
      pais: "Brasil"
    },
    cargo: "Desenvolvedor Senior",
    departamento: "Tecnologia",
    tipoContrato: "CLT",
    dataAdmissao: "2022-01-15",
    matricula: "EMP001",
    supervisor: "Maria Santos",
    salarioBase: 8500.00,
    beneficios: 1200.00,
    descontos: 850.00,
    formaPagamento: "PIX",
    chavePix: "joao.silva@empresa.com",
    foto: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Maria Santos",
    cpfCnpj: "987.654.321-00",
    rg: "98.765.432-1",
    dataNascimento: "1985-08-22",
    telefone: "(11) 88888-5678",
    email: "maria.santos@email.com",
    emailCorporativo: "maria.santos@empresa.com",
    estadoCivil: "Solteira",
    endereco: {
      rua: "Av. Paulista, 1000",
      numero: "1000",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01310-100",
      pais: "Brasil"
    },
    cargo: "Gerente de Marketing",
    departamento: "Marketing",
    tipoContrato: "CLT",
    dataAdmissao: "2021-03-10",
    matricula: "EMP002",
    supervisor: "Carlos Lima",
    salarioBase: 12000.00,
    beneficios: 2000.00,
    descontos: 1200.00,
    formaPagamento: "Transferência Bancária",
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    foto: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Carlos Lima",
    cpfCnpj: "12.345.678/0001-90",
    rg: "11.222.333-4",
    dataNascimento: "1988-12-03",
    telefone: "(11) 77777-9012",
    email: "carlos.lima@email.com",
    emailCorporativo: "carlos.lima@empresa.com",
    estadoCivil: "Divorciado",
    endereco: {
      rua: "Rua Augusta, 500",
      numero: "500",
      bairro: "Consolação",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01305-000",
      pais: "Brasil"
    },
    cargo: "Designer Freelancer",
    departamento: "Marketing",
    tipoContrato: "PJ",
    dataAdmissao: "2023-06-01",
    matricula: "EMP003",
    supervisor: "Maria Santos",
    salarioBase: 6000.00,
    beneficios: 0,
    descontos: 600.00,
    formaPagamento: "USDT",
    enderecoUsdt: "TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH",
    foto: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Ana Costa",
    cpfCnpj: "456.789.123-00",
    rg: "45.678.912-3",
    dataNascimento: "2000-02-14",
    telefone: "(11) 66666-3456",
    email: "ana.costa@email.com",
    emailCorporativo: "ana.costa@empresa.com",
    estadoCivil: "Solteira",
    endereco: {
      rua: "Rua da Liberdade, 200",
      numero: "200",
      bairro: "Liberdade",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01503-001",
      pais: "Brasil"
    },
    cargo: "Estagiária de Marketing",
    departamento: "Marketing",
    tipoContrato: "Estágio",
    dataAdmissao: "2024-01-08",
    matricula: "EMP004",
    supervisor: "Maria Santos",
    salarioBase: 1500.00,
    beneficios: 300.00,
    descontos: 150.00,
    formaPagamento: "PIX",
    chavePix: "(11) 66666-3456",
    foto: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    status: "Em experiência"
  }
]

export const historicoAlteracoes: Record<number, HistoricoAlteracao[]> = {
  1: [
    {
      id: 1,
      data: "2024-01-15",
      acao: "Promoção",
      usuario: "Admin",
      detalhes: "Promovido de Desenvolvedor Pleno para Senior"
    },
    {
      id: 2,
      data: "2023-12-01",
      acao: "Reajuste Salarial",
      usuario: "RH",
      detalhes: "Aumento de 15% no salário base"
    },
    {
      id: 3,
      data: "2023-06-15",
      acao: "Mudança de Departamento",
      usuario: "Gestor",
      detalhes: "Transferido do time de Frontend para Fullstack"
    }
  ],
  2: [
    {
      id: 4,
      data: "2024-01-01",
      acao: "Reajuste Salarial",
      usuario: "Admin",
      detalhes: "Aumento de 10% no salário base"
    },
    {
      id: 5,
      data: "2023-08-15",
      acao: "Promoção",
      usuario: "Diretoria",
      detalhes: "Promovida para Gerente de Marketing"
    }
  ],
  3: [
    {
      id: 6,
      data: "2023-12-20",
      acao: "Renovação de Contrato",
      usuario: "RH",
      detalhes: "Contrato PJ renovado por mais 12 meses"
    }
  ],
  4: [
    {
      id: 7,
      data: "2024-01-08",
      acao: "Admissão",
      usuario: "RH",
      detalhes: "Contratada como estagiária - período de experiência"
    }
  ]
}