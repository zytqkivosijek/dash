import { Documento, Acesso, LogAcesso } from '@/types/documento'

export const documentosData: Documento[] = [
  {
    id: 1,
    nome: "Contrato de Prestação de Serviços - Cliente ABC",
    tipo: "Documento",
    categoria: "Contratos",
    descricao: "Contrato de desenvolvimento de software para o cliente ABC Corp",
    arquivo: "contrato-abc-2024.pdf",
    tamanho: "2.5 MB",
    dataUpload: "2024-01-15",
    dataModificacao: "2024-01-20",
    responsavel: "João Silva",
    tags: ["contrato", "cliente", "desenvolvimento"],
    permissoes: {
      visualizar: ["Todos"],
      editar: ["Gerência", "Jurídico"],
      excluir: ["Admin"]
    },
    status: "Ativo",
    acessos: 15,
    ultimoAcesso: "2024-01-25"
  },
  {
    id: 2,
    nome: "Política de Segurança da Informação",
    tipo: "Documento",
    categoria: "Políticas",
    descricao: "Diretrizes de segurança e compliance para todos os colaboradores",
    arquivo: "politica-seguranca-2024.pdf",
    tamanho: "1.8 MB",
    dataUpload: "2024-01-10",
    dataModificacao: "2024-01-10",
    responsavel: "Maria Santos",
    tags: ["política", "segurança", "compliance"],
    permissoes: {
      visualizar: ["Todos"],
      editar: ["Admin", "Compliance"],
      excluir: ["Admin"]
    },
    status: "Ativo",
    acessos: 45,
    ultimoAcesso: "2024-01-26"
  },
  {
    id: 3,
    nome: "Dashboard Financeiro Q1 2024",
    tipo: "Planilha",
    categoria: "Financeiro",
    descricao: "Controle de receitas, despesas e indicadores financeiros do primeiro trimestre",
    url: "https://docs.google.com/spreadsheets/d/1234567890",
    dataUpload: "2024-01-05",
    dataModificacao: "2024-01-24",
    responsavel: "Carlos Lima",
    tags: ["financeiro", "dashboard", "Q1", "receitas"],
    permissoes: {
      visualizar: ["Financeiro", "Gerência"],
      editar: ["Financeiro"],
      excluir: ["Admin"]
    },
    status: "Ativo",
    acessos: 28,
    ultimoAcesso: "2024-01-26"
  },
  {
    id: 4,
    nome: "Controle de Férias 2024",
    tipo: "Planilha",
    categoria: "RH",
    descricao: "Planejamento e controle de férias de todos os colaboradores",
    url: "https://docs.google.com/spreadsheets/d/0987654321",
    dataUpload: "2023-12-20",
    dataModificacao: "2024-01-22",
    responsavel: "Ana Costa",
    tags: ["RH", "férias", "planejamento"],
    permissoes: {
      visualizar: ["RH", "Gerência"],
      editar: ["RH"],
      excluir: ["Admin"]
    },
    status: "Ativo",
    acessos: 12,
    ultimoAcesso: "2024-01-23"
  },
  {
    id: 5,
    nome: "Relatório de Performance - Janeiro 2024",
    tipo: "Documento",
    categoria: "Relatórios",
    descricao: "Análise de performance da equipe e indicadores de produtividade",
    arquivo: "relatorio-performance-jan2024.pdf",
    tamanho: "3.2 MB",
    dataUpload: "2024-02-01",
    dataModificacao: "2024-02-01",
    responsavel: "Maria Santos",
    tags: ["relatório", "performance", "produtividade"],
    permissoes: {
      visualizar: ["Gerência", "RH"],
      editar: ["Gerência"],
      excluir: ["Admin"]
    },
    status: "Ativo",
    acessos: 8,
    ultimoAcesso: "2024-02-02"
  }
]

export const acessosData: Acesso[] = [
  {
    id: 1,
    nome: "Google Workspace Admin",
    categoria: "Sistemas Corporativos",
    url: "https://admin.google.com",
    usuario: "admin@empresa.com",
    senha: "••••••••••••",
    descricao: "Acesso administrativo ao Google Workspace da empresa",
    tags: ["google", "admin", "email"],
    dataAtualizacao: "2024-01-15",
    responsavel: "João Silva",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "AWS Console",
    categoria: "Serviços Cloud",
    url: "https://console.aws.amazon.com",
    usuario: "empresa-admin",
    senha: "••••••••••••",
    descricao: "Console administrativo da Amazon Web Services",
    tags: ["aws", "cloud", "infraestrutura"],
    dataAtualizacao: "2024-01-20",
    responsavel: "Carlos Lima",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Stripe API",
    categoria: "APIs e Tokens",
    apiKey: "sk_live_••••••••••••••••••••••••",
    descricao: "Chave de API para processamento de pagamentos Stripe",
    tags: ["stripe", "api", "pagamentos"],
    dataAtualizacao: "2024-01-10",
    responsavel: "Maria Santos",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "GitHub Organization",
    categoria: "Desenvolvimento",
    url: "https://github.com/empresa",
    usuario: "empresa-dev",
    senha: "••••••••••••",
    token: "ghp_••••••••••••••••••••••••••••••••••••",
    descricao: "Acesso à organização GitHub da empresa",
    tags: ["github", "desenvolvimento", "repositórios"],
    dataAtualizacao: "2024-01-18",
    responsavel: "João Silva",
    status: "Ativo"
  },
  {
    id: 5,
    nome: "Database Production",
    categoria: "Bancos de Dados",
    url: "postgresql://prod-db.empresa.com:5432",
    usuario: "db_admin",
    senha: "••••••••••••",
    descricao: "Acesso ao banco de dados de produção",
    tags: ["database", "postgresql", "produção"],
    dataAtualizacao: "2024-01-25",
    responsavel: "Carlos Lima",
    status: "Ativo"
  }
]

export const logsAcesso: LogAcesso[] = [
  {
    id: 1,
    documentoId: 1,
    usuario: "João Silva",
    acao: "Visualizar",
    data: "2024-01-25T14:30:00Z",
    ip: "192.168.1.100"
  },
  {
    id: 2,
    documentoId: 3,
    usuario: "Maria Santos",
    acao: "Editar",
    data: "2024-01-24T09:15:00Z",
    ip: "192.168.1.101"
  },
  {
    id: 3,
    documentoId: 2,
    usuario: "Ana Costa",
    acao: "Baixar",
    data: "2024-01-23T16:45:00Z",
    ip: "192.168.1.102"
  }
]