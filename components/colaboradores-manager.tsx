'use client'

import * as React from 'react'
import { 
  IconPlus, 
  IconPencil, 
  IconTrash, 
  IconEye, 
  IconDownload, 
  IconSearch, 
  IconFilter,
  IconUser,
  IconBriefcase,
  IconCreditCard,
  IconFileText,
  IconHistory,
  IconCalendar,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBuilding,
  IconCash,
  IconUpload,
  IconX
} from '@tabler/icons-react'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

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
  dadosBancarios?: {
    banco: string
    agencia: string
    conta: string
  }
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
const formasPagamento = ['PIX', 'Transferência', 'USDT', 'Carteira Digital']
const estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União Estável']

const statusCores = {
  'Ativo': 'bg-green-500',
  'Inativo': 'bg-red-500',
  'Em experiência': 'bg-yellow-500'
}

const contratoIcons = {
  'CLT': '👔',
  'PJ': '💼',
  'Freelancer': '🎯',
  'Estágio': '🎓'
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
      estadoCivil: "Casado(a)",
      cargo: "Desenvolvedor Senior",
      departamento: "Tecnologia",
      tipoContrato: "CLT",
      dataAdmissao: "2022-01-15",
      matricula: "EMP001",
      supervisor: "Maria Santos",
      salarioBase: 8000.00,
      beneficios: 500.00,
      descontos: 800.00,
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
      estadoCivil: "Solteiro(a)",
      cargo: "Gerente de Marketing",
      departamento: "Marketing",
      tipoContrato: "CLT",
      dataAdmissao: "2021-03-10",
      matricula: "EMP002",
      supervisor: "Carlos Lima",
      salarioBase: 12000.00,
      beneficios: 1000.00,
      descontos: 1200.00,
      formaPagamento: "Transferência",
      dadosBancarios: {
        banco: "Banco do Brasil",
        agencia: "1234-5",
        conta: "12345-6"
      },
      status: "Ativo",
      historico: [
        {
          data: "2023-12-01",
          acao: "Bônus",
          usuario: "Admin",
          detalhes: "Bônus de performance anual"
        }
      ]
    },
    {
      id: 3,
      nomeCompleto: "Carlos Lima Costa",
      cpfCnpj: "12.345.678/0001-90",
      rg: "11.222.333-4",
      dataNascimento: "1988-12-03",
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
      estadoCivil: "Divorciado(a)",
      cargo: "Designer Freelancer",
      departamento: "Marketing",
      tipoContrato: "PJ",
      dataAdmissao: "2023-06-01",
      matricula: "EMP003",
      supervisor: "Maria Santos",
      salarioBase: 6000.00,
      beneficios: 0.00,
      descontos: 0.00,
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
      rg: "44.555.666-7",
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
      estadoCivil: "Solteiro(a)",
      cargo: "Estagiária de Marketing",
      departamento: "Marketing",
      tipoContrato: "Estágio",
      dataAdmissao: "2024-02-01",
      matricula: "EMP004",
      supervisor: "Maria Santos",
      salarioBase: 1500.00,
      beneficios: 200.00,
      descontos: 150.00,
      formaPagamento: "PIX",
      chavePix: "11966666666",
      status: "Em experiência",
      historico: [
        {
          data: "2024-02-01",
          acao: "Contratação",
          usuario: "RH",
          detalhes: "Contratada como estagiária"
        }
      ]
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [selectedColaborador, setSelectedColaborador] = React.useState<Colaborador | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
  const [selectedColaborador, setSelectedColaborador] = React.useState<Colaborador | null>(null)
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('todos')
  const [departamentoFilter, setDepartamentoFilter] = React.useState('todos')
  const [tipoContratoFilter, setTipoContratoFilter] = React.useState('todos')

  const [formData, setFormData] = React.useState({
    // Dados Pessoais
    nomeCompleto: '',
    cpfCnpj: '',
    rg: '',
    dataNascimento: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: 'Brasil'
    },
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
    dadosBancarios: {
      banco: '',
      agencia: '',
      conta: ''
    },
    enderecoUsdt: '',
    
    // Status
    status: 'Ativo' as Colaborador['status']
  })

  const filteredColaboradores = colaboradores.filter(colaborador => {
    const matchesSearch = colaborador.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.cpfCnpj.includes(searchTerm) ||
                         colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'todos' || colaborador.status === statusFilter
    const matchesDepartamento = departamentoFilter === 'todos' || colaborador.departamento === departamentoFilter
    const matchesTipoContrato = tipoContratoFilter === 'todos' || colaborador.tipoContrato === tipoContratoFilter
    
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
      endereco: formData.endereco,
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
      dadosBancarios: formData.dadosBancarios.banco ? formData.dadosBancarios : undefined,
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

  const handleViewProfile = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador)
    setIsProfileModalOpen(true)
  }

  const handleDeleteColaborador = (colaboradorId: number) => {
    const updatedColaboradores = colaboradores.filter(colaborador => colaborador.id !== colaboradorId)
    setColaboradores(updatedColaboradores)
  }

  const resetForm = () => {
    setFormData({
      nomeCompleto: '',
      cpfCnpj: '',
      rg: '',
      dataNascimento: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: 'Brasil'
      },
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
      dadosBancarios: {
        banco: '',
        agencia: '',
        conta: ''
      },
      enderecoUsdt: '',
      status: 'Ativo'
    })
  }

  const openProfile = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador)
    setIsProfileOpen(true)
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    // Simular exportação
    alert(`Exportando dados em formato ${format.toUpperCase()}...`)
  }

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{colaboradores.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {colaboradores.filter(c => c.status === 'Ativo').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Experiência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {colaboradores.filter(c => c.status === 'Em experiência').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {colaboradores.filter(c => c.status === 'Inativo').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header com filtros e ações */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Lista de Colaboradores</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie todos os funcionários da empresa
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportData('csv')}>
              <IconDownload className="w-4 h-4 mr-2" />
              Exportar
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
                    Preencha os dados do novo colaborador
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="pessoais" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
                    <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
                    <TabsTrigger value="financeiros">Financeiros</TabsTrigger>
                    <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
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
                        <Label htmlFor="rg">RG/Documento</Label>
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
                            {estadosCivis.map((estado) => (
                              <SelectItem key={estado} value={estado}>
                                {estado}
                              </SelectItem>
                            ))}
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
                            value={formData.endereco.rua}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              endereco: { ...formData.endereco, rua: e.target.value }
                            })}
                            placeholder="Nome da rua"
                          />
                        </div>
                        <div>
                          <Label htmlFor="numero">Número</Label>
                          <Input
                            id="numero"
                            value={formData.endereco.numero}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              endereco: { ...formData.endereco, numero: e.target.value }
                            })}
                            placeholder="123"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bairro">Bairro</Label>
                          <Input
                            id="bairro"
                            value={formData.endereco.bairro}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              endereco: { ...formData.endereco, bairro: e.target.value }
                            })}
                            placeholder="Nome do bairro"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cidade">Cidade</Label>
                          <Input
                            id="cidade"
                            value={formData.endereco.cidade}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              endereco: { ...formData.endereco, cidade: e.target.value }
                            })}
                            placeholder="Nome da cidade"
                          />
                        </div>
                        <div>
                          <Label htmlFor="estado">Estado</Label>
                          <Input
                            id="estado"
                            value={formData.endereco.estado}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              endereco: { ...formData.endereco, estado: e.target.value }
                            })}
                            placeholder="SP"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="profissionais" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cargo">Cargo *</Label>
                        <Input
                          id="cargo"
                          value={formData.cargo}
                          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                          placeholder="Ex: Desenvolvedor Senior"
                        />
                      </div>
                      <div>
                        <Label htmlFor="departamento">Departamento</Label>
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
                        <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
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
                        <Label htmlFor="dataAdmissao">Data de Admissão</Label>
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
                        <Label htmlFor="supervisor">Supervisor</Label>
                        <Input
                          id="supervisor"
                          value={formData.supervisor}
                          onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                          placeholder="Nome do supervisor"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financeiros" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="salarioBase">Salário Base (US$)</Label>
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
                        <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
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
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value: Colaborador['status']) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${statusCores[status as keyof typeof statusCores]}`} />
                                  {status}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                    
                    {formData.formaPagamento === 'Transferência' && (
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="banco">Banco</Label>
                          <Input
                            id="banco"
                            value={formData.dadosBancarios.banco}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              dadosBancarios: { ...formData.dadosBancarios, banco: e.target.value }
                            })}
                            placeholder="Nome do banco"
                          />
                        </div>
                        <div>
                          <Label htmlFor="agencia">Agência</Label>
                          <Input
                            id="agencia"
                            value={formData.dadosBancarios.agencia}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              dadosBancarios: { ...formData.dadosBancarios, agencia: e.target.value }
                            })}
                            placeholder="1234-5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="conta">Conta</Label>
                          <Input
                            id="conta"
                            value={formData.dadosBancarios.conta}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              dadosBancarios: { ...formData.dadosBancarios, conta: e.target.value }
                            })}
                            placeholder="12345-6"
                          />
                        </div>
                      </div>
                    )}
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
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CPF ou cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Departamentos</SelectItem>
              {departamentos.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tipoContratoFilter} onValueChange={setTipoContratoFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Contratos</SelectItem>
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
          <CardTitle>Colaboradores Cadastrados</CardTitle>
          <CardDescription>
            {filteredColaboradores.length} colaborador(es) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table style={{ minWidth: '1200px' }}>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
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
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconUser className="w-4 h-4" />
                        </div>
                        <div>
                          <button
                            onClick={() => openProfile(colaborador)}
                            className="font-medium hover:underline text-left"
                          >
                            {colaborador.nomeCompleto}
                          </button>
                          <div className="text-xs text-muted-foreground">
                            {colaborador.matricula}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{colaborador.cargo}</div>
                        <div className="text-sm text-muted-foreground">
                          {colaborador.departamento}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <span>{contratoIcons[colaborador.tipoContrato]}</span>
                        {colaborador.tipoContrato}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(colaborador.dataAdmissao)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <div className={`w-2 h-2 rounded-full ${statusCores[colaborador.status]}`} />
                        {colaborador.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      US$ {colaborador.salarioBase.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>{colaborador.telefone}</TableCell>
                    <TableCell>{colaborador.emailCorporativo}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openProfile(colaborador)}
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

      {/* Sheet do perfil detalhado */}
      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
          {selectedColaborador && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconUser className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{selectedColaborador.nomeCompleto}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedColaborador.cargo} • {selectedColaborador.matricula}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${statusCores[selectedColaborador.status]}`} />
                    {selectedColaborador.status}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  Perfil completo do colaborador
                </SheetDescription>
              </SheetHeader>

              <Tabs defaultValue="pessoais" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pessoais">Pessoais</TabsTrigger>
                  <TabsTrigger value="financeiros">Financeiros</TabsTrigger>
                  <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>

                <TabsContent value="pessoais" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Nome Completo</Label>
                        <p className="font-medium">{selectedColaborador.nomeCompleto}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">CPF/CNPJ</Label>
                        <p className="font-medium">{selectedColaborador.cpfCnpj}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">RG</Label>
                        <p className="font-medium">{selectedColaborador.rg}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                        <p className="font-medium">{formatDate(selectedColaborador.dataNascimento)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Telefone</Label>
                        <p className="font-medium flex items-center gap-2">
                          <IconPhone className="w-4 h-4" />
                          {selectedColaborador.telefone}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Estado Civil</Label>
                        <p className="font-medium">{selectedColaborador.estadoCivil}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">E-mail Pessoal</Label>
                        <p className="font-medium flex items-center gap-2">
                          <IconMail className="w-4 h-4" />
                          {selectedColaborador.emailPessoal}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">E-mail Corporativo</Label>
                        <p className="font-medium flex items-center gap-2">
                          <IconMail className="w-4 h-4" />
                          {selectedColaborador.emailCorporativo}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Endereço</Label>
                      <p className="font-medium flex items-start gap-2">
                        <IconMapPin className="w-4 h-4 mt-0.5" />
                        <span>
                          {selectedColaborador.endereco.rua}, {selectedColaborador.endereco.numero}<br />
                          {selectedColaborador.endereco.bairro} - {selectedColaborador.endereco.cidade}/{selectedColaborador.endereco.estado}<br />
                          CEP: {selectedColaborador.endereco.cep} - {selectedColaborador.endereco.pais}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Cargo</Label>
                        <p className="font-medium flex items-center gap-2">
                          <IconBriefcase className="w-4 h-4" />
                          {selectedColaborador.cargo}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Departamento</Label>
                        <p className="font-medium flex items-center gap-2">
                          <IconBuilding className="w-4 h-4" />
                          {selectedColaborador.departamento}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Tipo de Contrato</Label>
                        <p className="font-medium">
                          {contratoIcons[selectedColaborador.tipoContrato]} {selectedColaborador.tipoContrato}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Data de Admissão</Label>
                        <p className="font-medium flex items-center gap-2">
                          <IconCalendar className="w-4 h-4" />
                          {formatDate(selectedColaborador.dataAdmissao)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Supervisor</Label>
                        <p className="font-medium">{selectedColaborador.supervisor}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financeiros" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Salário Base</Label>
                      <p className="font-medium text-lg flex items-center gap-2">
                        <IconCash className="w-4 h-4" />
                        US$ {selectedColaborador.salarioBase.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Benefícios</Label>
                      <p className="font-medium text-lg text-green-600">
                        + US$ {selectedColaborador.beneficios.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Descontos</Label>
                      <p className="font-medium text-lg text-red-600">
                        - US$ {selectedColaborador.descontos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Valor Líquido</Label>
                      <p className="font-bold text-xl">
                        US$ {(selectedColaborador.salarioBase + selectedColaborador.beneficios - selectedColaborador.descontos).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pagamento" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Forma de Pagamento</Label>
                      <p className="font-medium flex items-center gap-2">
                        <IconCreditCard className="w-4 h-4" />
                        {selectedColaborador.formaPagamento}
                      </p>
                    </div>
                    
                    {selectedColaborador.chavePix && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Chave PIX</Label>
                        <p className="font-medium font-mono bg-muted p-2 rounded">
                          {selectedColaborador.chavePix}
                        </p>
                      </div>
                    )}
                    
                    {selectedColaborador.enderecoUsdt && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Endereço USDT</Label>
                        <p className="font-medium font-mono bg-muted p-2 rounded text-xs break-all">
                          {selectedColaborador.enderecoUsdt}
                        </p>
                      </div>
                    )}
                    
                    {selectedColaborador.dadosBancarios && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Dados Bancários</Label>
                        <div className="bg-muted p-3 rounded space-y-1">
                          <p><strong>Banco:</strong> {selectedColaborador.dadosBancarios.banco}</p>
                          <p><strong>Agência:</strong> {selectedColaborador.dadosBancarios.agencia}</p>
                          <p><strong>Conta:</strong> {selectedColaborador.dadosBancarios.conta}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="historico" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">Histórico de Alterações</Label>
                    {selectedColaborador.historico.map((item, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4 pb-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.acao}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.data)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.detalhes}</p>
                        <p className="text-xs text-muted-foreground">Por: {item.usuario}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}