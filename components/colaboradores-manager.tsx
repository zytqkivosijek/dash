'use client'

import * as React from 'react'
import { IconPlus, IconPencil, IconTrash, IconEye, IconDownload, IconSearch, IconFilter, IconUser, IconBuilding, IconCalendar, IconPhone, IconMail, IconMapPin, IconCreditCard, IconFileText, IconHistory, IconEdit, IconCheck, IconX } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface Colaborador {
  id: number
  // Dados Pessoais
  nomeCompleto: string
  cpfCnpj: string
  rg: string
  dataNascimento: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    pais: string
  }
  telefone: string
  emailPessoal: string
  emailCorporativo: string
  estadoCivil: string
  
  // Dados Profissionais
  cargo: string
  departamento: string
  tipoContrato: 'CLT' | 'PJ' | 'Freelancer' | 'Estágio'
  dataAdmissao: string
  dataDesligamento?: string
  matricula: string
  supervisor: string
  
  // Dados Financeiros
  salarioBase: number
  beneficios: number
  descontos: number
  formaPagamento: string
  chavePix?: string
  banco?: string
  agencia?: string
  conta?: string
  enderecoUsdt?: string
  
  // Status
  status: 'Ativo' | 'Inativo' | 'Em experiência'
  
  // Histórico
  historico: {
    data: string
    acao: string
    usuario: string
    detalhes: string
  }[]
}

const tiposContrato = ['CLT', 'PJ', 'Freelancer', 'Estágio']
const departamentos = ['Tecnologia', 'Marketing', 'Vendas', 'Financeiro', 'RH', 'Operações']
const statusOptions = ['Ativo', 'Inativo', 'Em experiência']
const formasPagamento = ['PIX', 'Transferência Bancária', 'USDT', 'Carteira Digital']

const contratoIcons = {
  'CLT': '👔',
  'PJ': '💼',
  'Freelancer': '🎯',
  'Estágio': '🎓'
}

const statusColors = {
  'Ativo': 'bg-green-500',
  'Inativo': 'bg-red-500',
  'Em experiência': 'bg-yellow-500'
}

export function ColaboradoresManager() {
  const [colaboradores, setColaboradores] = React.useState<Colaborador[]>([
    {
      id: 1,
      nomeCompleto: "João Silva Santos",
      cpfCnpj: "123.456.789-00",
      rg: "12.345.678-9",
      dataNascimento: "1990-05-15",
      endereco: {
        rua: "Rua das Flores",
        numero: "123",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567",
        pais: "Brasil"
      },
      telefone: "(11) 99999-9999",
      emailPessoal: "joao.silva@gmail.com",
      emailCorporativo: "joao.silva@empresa.com",
      estadoCivil: "Solteiro",
      cargo: "Desenvolvedor Senior",
      departamento: "Tecnologia",
      tipoContrato: "CLT",
      dataAdmissao: "2022-01-15",
      matricula: "EMP001",
      supervisor: "Maria Santos",
      salarioBase: 8500.00,
      beneficios: 500.00,
      descontos: 850.00,
      formaPagamento: "PIX",
      chavePix: "joao.silva@empresa.com",
      status: "Ativo",
      historico: [
        {
          data: "2024-01-15",
          acao: "Promoção",
          usuario: "Admin",
          detalhes: "Promovido para Desenvolvedor Senior"
        },
        {
          data: "2023-06-01",
          acao: "Reajuste Salarial",
          usuario: "RH",
          detalhes: "Aumento de 15% no salário base"
        }
      ]
    },
    {
      id: 2,
      nomeCompleto: "Maria Santos Oliveira",
      cpfCnpj: "987.654.321-00",
      rg: "98.765.432-1",
      dataNascimento: "1985-08-22",
      endereco: {
        rua: "Av. Paulista",
        numero: "1000",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-100",
        pais: "Brasil"
      },
      telefone: "(11) 88888-8888",
      emailPessoal: "maria.santos@gmail.com",
      emailCorporativo: "maria.santos@empresa.com",
      estadoCivil: "Casada",
      cargo: "Gerente de Marketing",
      departamento: "Marketing",
      tipoContrato: "CLT",
      dataAdmissao: "2021-03-10",
      matricula: "EMP002",
      supervisor: "Carlos Lima",
      salarioBase: 12000.00,
      beneficios: 1200.00,
      descontos: 1800.00,
      formaPagamento: "Transferência Bancária",
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
      status: "Ativo",
      historico: [
        {
          data: "2023-12-01",
          acao: "Mudança de Departamento",
          usuario: "Admin",
          detalhes: "Transferida para Marketing"
        }
      ]
    },
    {
      id: 3,
      nomeCompleto: "Carlos Lima Designer LTDA",
      cpfCnpj: "12.345.678/0001-90",
      rg: "11.222.333-4",
      dataNascimento: "1992-12-03",
      endereco: {
        rua: "Rua Augusta",
        numero: "500",
        bairro: "Consolação",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01305-000",
        pais: "Brasil"
      },
      telefone: "(11) 77777-7777",
      emailPessoal: "carlos.lima@gmail.com",
      emailCorporativo: "carlos.lima@empresa.com",
      estadoCivil: "Solteiro",
      cargo: "Designer Freelancer",
      departamento: "Marketing",
      tipoContrato: "PJ",
      dataAdmissao: "2023-06-01",
      matricula: "EMP003",
      supervisor: "Maria Santos",
      salarioBase: 6000.00,
      beneficios: 0.00,
      descontos: 600.00,
      formaPagamento: "USDT",
      enderecoUsdt: "TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH",
      status: "Ativo",
      historico: [
        {
          data: "2023-06-01",
          acao: "Contratação",
          usuario: "RH",
          detalhes: "Contratado como PJ"
        }
      ]
    },
    {
      id: 4,
      nomeCompleto: "Ana Costa Silva",
      cpfCnpj: "456.789.123-00",
      rg: "45.678.912-3",
      dataNascimento: "2000-03-18",
      endereco: {
        rua: "Rua Oscar Freire",
        numero: "200",
        bairro: "Jardins",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01426-000",
        pais: "Brasil"
      },
      telefone: "(11) 66666-6666",
      emailPessoal: "ana.costa@gmail.com",
      emailCorporativo: "ana.costa@empresa.com",
      estadoCivil: "Solteira",
      cargo: "Estagiária de Marketing",
      departamento: "Marketing",
      tipoContrato: "Estágio",
      dataAdmissao: "2024-01-08",
      matricula: "EMP004",
      supervisor: "Maria Santos",
      salarioBase: 1500.00,
      beneficios: 200.00,
      descontos: 0.00,
      formaPagamento: "PIX",
      chavePix: "11966666666",
      status: "Em experiência",
      historico: [
        {
          data: "2024-01-08",
          acao: "Contratação",
          usuario: "RH",
          detalhes: "Contratada como estagiária"
        }
      ]
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
  const [selectedColaborador, setSelectedColaborador] = React.useState<Colaborador | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [departamentoFilter, setDepartamentoFilter] = React.useState('all')
  const [tipoContratoFilter, setTipoContratoFilter] = React.useState('all')

  const [formData, setFormData] = React.useState({
    // Dados Pessoais
    nomeCompleto: '',
    cpfCnpj: '',
    rg: '',
    dataNascimento: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: 'Brasil',
    telefone: '',
    emailPessoal: '',
    emailCorporativo: '',
    estadoCivil: '',
    
    // Dados Profissionais
    cargo: '',
    departamento: '',
    tipoContrato: 'CLT' as Colaborador['tipoContrato'],
    dataAdmissao: '',
    matricula: '',
    supervisor: '',
    
    // Dados Financeiros
    salarioBase: '',
    beneficios: '',
    descontos: '',
    formaPagamento: '',
    chavePix: '',
    banco: '',
    agencia: '',
    conta: '',
    enderecoUsdt: '',
    
    // Status
    status: 'Ativo' as Colaborador['status']
  })

  // Contadores para os cards
  const totalColaboradores = colaboradores.length
  const colaboradoresAtivos = colaboradores.filter(c => c.status === 'Ativo').length
  const colaboradoresExperiencia = colaboradores.filter(c => c.status === 'Em experiência').length
  const colaboradoresInativos = colaboradores.filter(c => c.status === 'Inativo').length

  // Filtros
  const filteredColaboradores = colaboradores.filter(colaborador => {
    const matchesSearch = colaborador.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.cpfCnpj.includes(searchTerm) ||
                         colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || colaborador.status === statusFilter
    const matchesDepartamento = departamentoFilter === 'all' || colaborador.departamento === departamentoFilter
    const matchesTipoContrato = tipoContratoFilter === 'all' || colaborador.tipoContrato === tipoContratoFilter
    
    return matchesSearch && matchesStatus && matchesDepartamento && matchesTipoContrato
  })

  const handleAddColaborador = () => {
    if (!formData.nomeCompleto || !formData.cpfCnpj || !formData.cargo) return

    const novoColaborador: Colaborador = {
      id: Math.max(...colaboradores.map(c => c.id), 0) + 1,
      nomeCompleto: formData.nomeCompleto,
      cpfCnpj: formData.cpfCnpj,
      rg: formData.rg,
      dataNascimento: formData.dataNascimento,
      endereco: {
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        pais: formData.pais
      },
      telefone: formData.telefone,
      emailPessoal: formData.emailPessoal,
      emailCorporativo: formData.emailCorporativo,
      estadoCivil: formData.estadoCivil,
      cargo: formData.cargo,
      departamento: formData.departamento,
      tipoContrato: formData.tipoContrato,
      dataAdmissao: formData.dataAdmissao,
      matricula: formData.matricula,
      supervisor: formData.supervisor,
      salarioBase: parseFloat(formData.salarioBase) || 0,
      beneficios: parseFloat(formData.beneficios) || 0,
      descontos: parseFloat(formData.descontos) || 0,
      formaPagamento: formData.formaPagamento,
      chavePix: formData.chavePix,
      banco: formData.banco,
      agencia: formData.agencia,
      conta: formData.conta,
      enderecoUsdt: formData.enderecoUsdt,
      status: formData.status,
      historico: [
        {
          data: new Date().toISOString().split('T')[0],
          acao: 'Cadastro',
          usuario: 'Admin',
          detalhes: 'Colaborador cadastrado no sistema'
        }
      ]
    }

    setColaboradores([...colaboradores, novoColaborador])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleDeleteColaborador = (colaboradorId: number) => {
    const updatedColaboradores = colaboradores.filter(colaborador => colaborador.id !== colaboradorId)
    setColaboradores(updatedColaboradores)
  }

  const handleViewProfile = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador)
    setIsProfileModalOpen(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setFormData({
      nomeCompleto: '',
      cpfCnpj: '',
      rg: '',
      dataNascimento: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: 'Brasil',
      telefone: '',
      emailPessoal: '',
      emailCorporativo: '',
      estadoCivil: '',
      cargo: '',
      departamento: '',
      tipoContrato: 'CLT',
      dataAdmissao: '',
      matricula: '',
      supervisor: '',
      salarioBase: '',
      beneficios: '',
      descontos: '',
      formaPagamento: '',
      chavePix: '',
      banco: '',
      agencia: '',
      conta: '',
      enderecoUsdt: '',
      status: 'Ativo'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const exportData = (format: string) => {
    // Simular exportação
    alert(`Exportando dados em formato ${format}...`)
  }

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total de Colaboradores</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {totalColaboradores}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalColaboradores}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Ativos</span>
              <Badge className="bg-green-500 text-white">
                {colaboradoresAtivos}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {colaboradoresAtivos}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Em Experiência</span>
              <Badge className="bg-yellow-500 text-white">
                {colaboradoresExperiencia}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {colaboradoresExperiencia}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Inativos</span>
              <Badge className="bg-red-500 text-white">
                {colaboradoresInativos}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {colaboradoresInativos}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header com filtros e botões */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Lista de Colaboradores</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie todos os funcionários da empresa
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportData('CSV')}>
              <IconDownload className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
            <Button variant="outline" onClick={() => exportData('Excel')}>
              <IconDownload className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => exportData('PDF')}>
              <IconDownload className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) resetForm()
            }}>
              <DialogTrigger asChild>
                <Button>
                  <IconPlus className="w-4 h-4 mr-2" />
                  Adicionar Colaborador
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
                  <DialogDescription>
                    Preencha os dados completos do colaborador
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="pessoais" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
                    <TabsTrigger value="profissionais">Dados Profissionais</TabsTrigger>
                    <TabsTrigger value="financeiros">Dados Financeiros</TabsTrigger>
                    <TabsTrigger value="pagamento">Dados de Pagamento</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pessoais" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                        <Input
                          id="nomeCompleto"
                          value={formData.nomeCompleto}
                          onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                          placeholder="Nome completo do colaborador"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpj"
                          value={formData.cpfCnpj}
                          onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                          placeholder="000.000.000-00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rg">RG/CNH/Passaporte</Label>
                        <Input
                          id="rg"
                          value={formData.rg}
                          onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                          placeholder="00.000.000-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                        <Input
                          id="dataNascimento"
                          type="date"
                          value={formData.dataNascimento}
                          onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emailPessoal">E-mail Pessoal</Label>
                        <Input
                          id="emailPessoal"
                          type="email"
                          value={formData.emailPessoal}
                          onChange={(e) => setFormData({ ...formData, emailPessoal: e.target.value })}
                          placeholder="email@pessoal.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emailCorporativo">E-mail Corporativo</Label>
                        <Input
                          id="emailCorporativo"
                          type="email"
                          value={formData.emailCorporativo}
                          onChange={(e) => setFormData({ ...formData, emailCorporativo: e.target.value })}
                          placeholder="email@empresa.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="estadoCivil">Estado Civil</Label>
                        <Select value={formData.estadoCivil} onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Solteiro">Solteiro(a)</SelectItem>
                            <SelectItem value="Casado">Casado(a)</SelectItem>
                            <SelectItem value="Divorciado">Divorciado(a)</SelectItem>
                            <SelectItem value="Viúvo">Viúvo(a)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Endereço</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="rua">Rua</Label>
                          <Input
                            id="rua"
                            value={formData.rua}
                            onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                            placeholder="Nome da rua"
                          />
                        </div>
                        <div>
                          <Label htmlFor="numero">Número</Label>
                          <Input
                            id="numero"
                            value={formData.numero}
                            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                            placeholder="123"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bairro">Bairro</Label>
                          <Input
                            id="bairro"
                            value={formData.bairro}
                            onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                            placeholder="Nome do bairro"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cidade">Cidade</Label>
                          <Input
                            id="cidade"
                            value={formData.cidade}
                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                            placeholder="Nome da cidade"
                          />
                        </div>
                        <div>
                          <Label htmlFor="estado">Estado</Label>
                          <Input
                            id="estado"
                            value={formData.estado}
                            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                            placeholder="SP"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cep">CEP</Label>
                          <Input
                            id="cep"
                            value={formData.cep}
                            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                            placeholder="00000-000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pais">País</Label>
                          <Input
                            id="pais"
                            value={formData.pais}
                            onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                            placeholder="Brasil"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="profissionais" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cargo">Cargo/Função *</Label>
                        <Input
                          id="cargo"
                          value={formData.cargo}
                          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                          placeholder="Ex: Desenvolvedor, Gerente..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="departamento">Departamento *</Label>
                        <Select value={formData.departamento} onValueChange={(value) => setFormData({ ...formData, departamento: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            {departamentos.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tipoContrato">Tipo de Contrato *</Label>
                        <Select value={formData.tipoContrato} onValueChange={(value: Colaborador['tipoContrato']) => setFormData({ ...formData, tipoContrato: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposContrato.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                <div className="flex items-center gap-2">
                                  <span>{contratoIcons[tipo as keyof typeof contratoIcons]}</span>
                                  {tipo}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
                        <Input
                          id="dataAdmissao"
                          type="date"
                          value={formData.dataAdmissao}
                          onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="matricula">Matrícula</Label>
                        <Input
                          id="matricula"
                          value={formData.matricula}
                          onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                          placeholder="EMP001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supervisor">Supervisor/Gestor</Label>
                        <Input
                          id="supervisor"
                          value={formData.supervisor}
                          onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                          placeholder="Nome do supervisor"
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status *</Label>
                        <Select value={formData.status} onValueChange={(value: Colaborador['status']) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financeiros" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="salarioBase">Salário Base (US$) *</Label>
                        <Input
                          id="salarioBase"
                          type="number"
                          step="0.01"
                          value={formData.salarioBase}
                          onChange={(e) => setFormData({ ...formData, salarioBase: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="beneficios">Benefícios (US$)</Label>
                        <Input
                          id="beneficios"
                          type="number"
                          step="0.01"
                          value={formData.beneficios}
                          onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="descontos">Descontos (US$)</Label>
                        <Input
                          id="descontos"
                          type="number"
                          step="0.01"
                          value={formData.descontos}
                          onChange={(e) => setFormData({ ...formData, descontos: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pagamento" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
                        <Select value={formData.formaPagamento} onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a forma" />
                          </SelectTrigger>
                          <SelectContent>
                            {formasPagamento.map((forma) => (
                              <SelectItem key={forma} value={forma}>
                                {forma}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {formData.formaPagamento === 'PIX' && (
                        <div>
                          <Label htmlFor="chavePix">Chave PIX</Label>
                          <Input
                            id="chavePix"
                            value={formData.chavePix}
                            onChange={(e) => setFormData({ ...formData, chavePix: e.target.value })}
                            placeholder="email@exemplo.com ou telefone"
                          />
                        </div>
                      )}
                      
                      {formData.formaPagamento === 'USDT' && (
                        <div>
                          <Label htmlFor="enderecoUsdt">Endereço USDT</Label>
                          <Input
                            id="enderecoUsdt"
                            value={formData.enderecoUsdt}
                            onChange={(e) => setFormData({ ...formData, enderecoUsdt: e.target.value })}
                            placeholder="TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH"
                          />
                        </div>
                      )}
                      
                      {formData.formaPagamento === 'Transferência Bancária' && (
                        <>
                          <div>
                            <Label htmlFor="banco">Banco</Label>
                            <Input
                              id="banco"
                              value={formData.banco}
                              onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
                              placeholder="Nome do banco"
                            />
                          </div>
                          <div>
                            <Label htmlFor="agencia">Agência</Label>
                            <Input
                              id="agencia"
                              value={formData.agencia}
                              onChange={(e) => setFormData({ ...formData, agencia: e.target.value })}
                              placeholder="0000-0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="conta">Conta</Label>
                            <Input
                              id="conta"
                              value={formData.conta}
                              onChange={(e) => setFormData({ ...formData, conta: e.target.value })}
                              placeholder="00000-0"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false)
                    resetForm()
                  }}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddColaborador}>
                    Adicionar Colaborador
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <IconSearch className="w-4 h-4" />
            <Input
              placeholder="Buscar por nome, CPF ou cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Departamentos</SelectItem>
              {departamentos.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tipoContratoFilter} onValueChange={setTipoContratoFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo Contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              {tiposContrato.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela de colaboradores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Colaboradores</CardTitle>
          <CardDescription>
            {filteredColaboradores.length} colaborador(es) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table style={{ minWidth: '1200px' }}>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Colaborador</TableHead>
                  <TableHead>Cargo/Departamento</TableHead>
                  <TableHead>Tipo de Contrato</TableHead>
                  <TableHead>Data de Admissão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salário Base</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColaboradores.map((colaborador) => (
                  <TableRow key={colaborador.id}>
                    <TableCell>
                      <button
                        onClick={() => handleViewProfile(colaborador)}
                        className="text-left hover:text-primary hover:underline"
                      >
                        <div className="font-medium">{colaborador.nomeCompleto}</div>
                        <div className="text-sm text-muted-foreground">{colaborador.matricula}</div>
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{colaborador.cargo}</div>
                      <div className="text-sm text-muted-foreground">{colaborador.departamento}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <span>{contratoIcons[colaborador.tipoContrato]}</span>
                        {colaborador.tipoContrato}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(colaborador.dataAdmissao)}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[colaborador.status]} text-white`}>
                        {colaborador.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(colaborador.salarioBase)}
                    </TableCell>
                    <TableCell>{colaborador.telefone}</TableCell>
                    <TableCell>{colaborador.emailCorporativo}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewProfile(colaborador)}
                        >
                          <IconEye className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <IconTrash className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o colaborador "{colaborador.nomeCompleto}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteColaborador(colaborador.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredColaboradores.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum colaborador encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de perfil do colaborador */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedColaborador && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconUser className="w-6 h-6" />
                    <div>
                      <div>{selectedColaborador.nomeCompleto}</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        {selectedColaborador.cargo} • {selectedColaborador.departamento}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusColors[selectedColaborador.status]} text-white`}>
                      {selectedColaborador.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <IconX className="w-4 h-4" /> : <IconEdit className="w-4 h-4" />}
                      {isEditing ? 'Cancelar' : 'Editar'}
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="pessoais" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
                  <TabsTrigger value="financeiros">Dados Financeiros</TabsTrigger>
                  <TabsTrigger value="pagamento">Dados de Pagamento</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>

                <TabsContent value="pessoais" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <IconUser className="w-4 h-4" />
                        Informações Pessoais
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                          <div className="font-medium">{selectedColaborador.nomeCompleto}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">CPF/CNPJ</Label>
                          <div className="font-mono">{selectedColaborador.cpfCnpj}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">RG</Label>
                          <div className="font-mono">{selectedColaborador.rg}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Data de Nascimento</Label>
                          <div>{formatDate(selectedColaborador.dataNascimento)}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Estado Civil</Label>
                          <div>{selectedColaborador.estadoCivil}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <IconPhone className="w-4 h-4" />
                        Contato
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Telefone</Label>
                          <div>{selectedColaborador.telefone}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">E-mail Pessoal</Label>
                          <div>{selectedColaborador.emailPessoal}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">E-mail Corporativo</Label>
                          <div>{selectedColaborador.emailCorporativo}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-6">
                        <IconMapPin className="w-4 h-4" />
                        Endereço
                      </div>
                      <div className="text-sm">
                        <div>{selectedColaborador.endereco.rua}, {selectedColaborador.endereco.numero}</div>
                        <div>{selectedColaborador.endereco.bairro}</div>
                        <div>{selectedColaborador.endereco.cidade} - {selectedColaborador.endereco.estado}</div>
                        <div>{selectedColaborador.endereco.cep}</div>
                        <div>{selectedColaborador.endereco.pais}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                      <IconBuilding className="w-4 h-4" />
                      Dados Profissionais
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Cargo</Label>
                        <div className="font-medium">{selectedColaborador.cargo}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Departamento</Label>
                        <div>{selectedColaborador.departamento}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Tipo de Contrato</Label>
                        <div className="flex items-center gap-1">
                          <span>{contratoIcons[selectedColaborador.tipoContrato]}</span>
                          {selectedColaborador.tipoContrato}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Data de Admissão</Label>
                        <div>{formatDate(selectedColaborador.dataAdmissao)}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Matrícula</Label>
                        <div className="font-mono">{selectedColaborador.matricula}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Supervisor</Label>
                        <div>{selectedColaborador.supervisor}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financeiros" className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <IconCreditCard className="w-4 h-4" />
                    Informações Financeiras
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Salário Base</Label>
                        <div className="text-2xl font-bold">{formatCurrency(selectedColaborador.salarioBase)}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Benefícios</Label>
                        <div className="text-lg font-medium text-green-600">
                          + {formatCurrency(selectedColaborador.beneficios)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Descontos</Label>
                        <div className="text-lg font-medium text-red-600">
                          - {formatCurrency(selectedColaborador.descontos)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <Label className="text-xs text-muted-foreground">Valor Líquido</Label>
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(selectedColaborador.salarioBase + selectedColaborador.beneficios - selectedColaborador.descontos)}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pagamento" className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <IconCreditCard className="w-4 h-4" />
                    Dados de Pagamento
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Forma de Pagamento</Label>
                      <div className="font-medium">{selectedColaborador.formaPagamento}</div>
                    </div>
                    
                    {selectedColaborador.chavePix && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Chave PIX</Label>
                        <div className="font-mono bg-muted p-2 rounded">{selectedColaborador.chavePix}</div>
                      </div>
                    )}
                    
                    {selectedColaborador.enderecoUsdt && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Endereço USDT</Label>
                        <div className="font-mono bg-muted p-2 rounded text-xs break-all">{selectedColaborador.enderecoUsdt}</div>
                      </div>
                    )}
                    
                    {selectedColaborador.banco && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Dados Bancários</Label>
                        <div className="bg-muted p-3 rounded space-y-1">
                          <div><strong>Banco:</strong> {selectedColaborador.banco}</div>
                          <div><strong>Agência:</strong> {selectedColaborador.agencia}</div>
                          <div><strong>Conta:</strong> {selectedColaborador.conta}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="historico" className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <IconHistory className="w-4 h-4" />
                    Histórico de Alterações
                  </div>
                  <div className="space-y-3">
                    {selectedColaborador.historico.map((item, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{item.acao}</div>
                            <div className="text-xs text-muted-foreground">{formatDate(item.data)}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{item.detalhes}</div>
                          <div className="text-xs text-muted-foreground">Por: {item.usuario}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}