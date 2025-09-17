'use client'

import * as React from 'react'
import { IconPlus, IconPencil, IconTrash, IconCalendar, IconFilter, IconDownload, IconCheck, IconClock, IconLoader, IconUser, IconX } from '@tabler/icons-react'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface Funcionario {
  id: number
  nomeCompleto: string
  cpfCnpj: string
  cargo: string
  departamento: string
  tipoContrato: 'CLT' | 'PJ' | 'Freelancer'
  dataAdmissao: string
  email: string
  telefone: string
  salarioFixo: number
  metodoPagamento: string
  chavePix?: string
  enderecoUsdt?: string
  banco?: string
  agencia?: string
  conta?: string
  dadosPagamento: string
  ativo: boolean
  observacoes?: string
}

interface PagamentoFolha {
  id: number
  funcionarioId: number
  funcionario: Funcionario
  dataPagamento: string
  periodoReferencia: string
  valorBruto: number
  descontos: {
    inss: number
    fgts: number
    impostos: number
    adiantamentos: number
    outros: number
  }
  bonus: {
    performance: number
    ferias: number
    horaExtra: number
    gratificacao: number
    outros: number
  }
  valorLiquido: number
  metodoPagamento: string
  dadosPagamento: string
  status: 'pago' | 'pendente' | 'processando'
  observacoes?: string
  comprovantes?: string[]
}

interface HistoricoPagamento {
  id: number
  periodo: string
  valorBruto: number
  valorLiquido: number
  status: string
  dataPagamento: string
}

const departamentos = ['Tecnologia', 'Marketing', 'Vendas', 'Financeiro', 'RH', 'Operações']
const metodosPagamento = ['PIX', 'Transferência', 'USDT', 'Boleto', 'Cheque', 'Carteira Digital']
const statusOptions = ['pago', 'pendente', 'processando']
const tiposContrato = ['CLT', 'PJ', 'Freelancer']

const statusColors = {
  'pago': 'bg-green-500',
  'pendente': 'bg-red-500',
  'processando': 'bg-yellow-500'
}

const statusIcons = {
  'pago': IconCheck,
  'pendente': IconClock,
  'processando': IconLoader
}

export function FolhaPagamentoManager() {
  // Dados de funcionários cadastrados (expandidos)
  const [funcionarios] = React.useState<Funcionario[]>([
    {
      id: 1,
      nomeCompleto: 'João Silva Santos',
      cpfCnpj: '123.456.789-00',
      cargo: 'Desenvolvedor Senior',
      departamento: 'Tecnologia',
      tipoContrato: 'CLT',
      dataAdmissao: '2023-01-15',
      email: 'joao.silva@empresa.com',
      telefone: '+55 11 99999-0001',
      salarioFixo: 8000.00,
      metodoPagamento: 'PIX',
      chavePix: 'joao.silva@empresa.com',
      dadosPagamento: 'PIX: joao.silva@empresa.com',
      ativo: true,
      observacoes: 'Funcionário exemplar, sempre pontual'
    },
    {
      id: 2,
      nomeCompleto: 'Maria Santos Oliveira',
      cpfCnpj: '987.654.321-00',
      cargo: 'Gerente de Marketing',
      departamento: 'Marketing',
      tipoContrato: 'CLT',
      dataAdmissao: '2022-03-10',
      email: 'maria.santos@empresa.com',
      telefone: '+55 11 99999-0002',
      salarioFixo: 12000.00,
      metodoPagamento: 'Transferência',
      banco: 'Banco do Brasil',
      agencia: '1234',
      conta: '56789-0',
      dadosPagamento: 'Banco: 001 | Ag: 1234 | CC: 56789-0',
      ativo: true,
      observacoes: 'Liderança forte, resultados consistentes'
    },
    {
      id: 3,
      nomeCompleto: 'Carlos Lima Ferreira',
      cpfCnpj: '456.789.123-00',
      cargo: 'Analista Financeiro',
      departamento: 'Financeiro',
      tipoContrato: 'CLT',
      dataAdmissao: '2023-06-01',
      email: 'carlos.lima@empresa.com',
      telefone: '+55 11 99999-0003',
      salarioFixo: 6500.00,
      metodoPagamento: 'PIX',
      chavePix: '+5511999990003',
      dadosPagamento: 'PIX: +55 11 99999-0003',
      ativo: true
    },
    {
      id: 4,
      nomeCompleto: 'Ana Costa Ribeiro',
      cpfCnpj: '12.345.678/0001-90',
      cargo: 'Designer UX/UI',
      departamento: 'Tecnologia',
      tipoContrato: 'PJ',
      dataAdmissao: '2023-09-15',
      email: 'ana.costa@freelancer.com',
      telefone: '+55 11 99999-0004',
      salarioFixo: 7000.00,
      metodoPagamento: 'USDT',
      enderecoUsdt: 'TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH',
      dadosPagamento: 'USDT: TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH',
      ativo: true,
      observacoes: 'Freelancer especializada em UX, trabalho remoto'
    }
  ])

  const [pagamentos, setPagamentos] = React.useState<PagamentoFolha[]>([
    {
      id: 1,
      funcionarioId: 1,
      funcionario: funcionarios[0],
      dataPagamento: '2024-01-05',
      periodoReferencia: '01/2024',
      valorBruto: 8000.00,
      descontos: {
        inss: 600.00,
        fgts: 160.00,
        impostos: 40.00,
        adiantamentos: 0,
        outros: 0
      },
      bonus: {
        performance: 0,
        ferias: 0,
        horaExtra: 0,
        gratificacao: 0,
        outros: 0
      },
      valorLiquido: 7200.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'joao.silva@empresa.com',
      status: 'pago',
      observacoes: 'Salário regular',
      comprovantes: ['comprovante_joao_01_2024.pdf']
    },
    {
      id: 2,
      funcionarioId: 2,
      funcionario: funcionarios[1],
      dataPagamento: '2024-01-05',
      periodoReferencia: '01/2024',
      valorBruto: 12000.00,
      descontos: {
        inss: 900.00,
        fgts: 240.00,
        impostos: 60.00,
        adiantamentos: 0,
        outros: 0
      },
      bonus: {
        performance: 0,
        ferias: 0,
        horaExtra: 0,
        gratificacao: 0,
        outros: 0
      },
      valorLiquido: 10800.00,
      metodoPagamento: 'Transferência',
      dadosPagamento: 'Banco: 001 | Ag: 1234 | CC: 56789-0',
      status: 'pago'
    },
    {
      id: 3,
      funcionarioId: 3,
      funcionario: funcionarios[2],
      dataPagamento: '2024-01-05',
      periodoReferencia: '01/2024',
      valorBruto: 6500.00,
      descontos: {
        inss: 487.50,
        fgts: 130.00,
        impostos: 32.50,
        adiantamentos: 0,
        outros: 0
      },
      bonus: {
        performance: 0,
        ferias: 0,
        horaExtra: 0,
        gratificacao: 0,
        outros: 0
      },
      valorLiquido: 5850.00,
      metodoPagamento: 'PIX',
      dadosPagamento: '+55 11 99999-0003',
      status: 'pendente'
    },
    {
      id: 4,
      funcionarioId: 4,
      funcionario: funcionarios[3],
      dataPagamento: '2024-01-05',
      periodoReferencia: '01/2024',
      valorBruto: 7000.00,
      descontos: {
        inss: 0,
        fgts: 0,
        impostos: 250.00,
        adiantamentos: 0,
        outros: 0
      },
      bonus: {
        performance: 500.00,
        ferias: 0,
        horaExtra: 0,
        gratificacao: 0,
        outros: 0
      },
      valorLiquido: 7250.00,
      metodoPagamento: 'USDT',
      dadosPagamento: 'TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH',
      status: 'processando',
      observacoes: 'Bônus de R$ 500 por projeto concluído'
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingPagamento, setEditingPagamento] = React.useState<PagamentoFolha | null>(null)
  const [selectedFuncionario, setSelectedFuncionario] = React.useState<Funcionario | null>(null)
  const [filtros, setFiltros] = React.useState({
    periodo: '01/2024',
    status: 'todos',
    departamento: 'todos'
  })
  const [formData, setFormData] = React.useState({
    funcionarioId: '',
    dataPagamento: '',
    periodoReferencia: '01/2024',
    valorBruto: '',
    descontos: {
      inss: '0',
      fgts: '0',
      impostos: '0',
      adiantamentos: '0',
      outros: '0'
    },
    bonus: {
      performance: '0',
      ferias: '0',
      horaExtra: '0',
      gratificacao: '0',
      outros: '0'
    },
    metodoPagamento: '',
    dadosPagamento: '',
    status: 'pendente' as PagamentoFolha['status'],
    observacoes: ''
  })

  // Filtrar pagamentos
  const pagamentosFiltrados = pagamentos.filter(pagamento => {
    const matchPeriodo = filtros.periodo === 'todos' || pagamento.periodoReferencia === filtros.periodo
    const matchStatus = filtros.status === 'todos' || pagamento.status === filtros.status
    const matchDepartamento = filtros.departamento === 'todos' || pagamento.funcionario.departamento === filtros.departamento
    
    return matchPeriodo && matchStatus && matchDepartamento
  })

  // Calcular totais
  const totalFolha = pagamentosFiltrados.reduce((sum, pagamento) => sum + pagamento.valorLiquido, 0)
  const totalPagamentos = pagamentosFiltrados.length
  const pagamentosPendentes = pagamentosFiltrados.filter(p => p.status === 'pendente').length

  // Calcular totais de descontos e bônus
  const calcularTotalDescontos = (descontos: any) => {
    return Object.values(descontos).reduce((sum: number, valor: any) => sum + parseFloat(valor || '0'), 0)
  }

  const calcularTotalBonus = (bonus: any) => {
    return Object.values(bonus).reduce((sum: number, valor: any) => sum + parseFloat(valor || '0'), 0)
  }

  const calcularValorLiquido = () => {
    const bruto = parseFloat(formData.valorBruto || '0')
    const totalDescontos = calcularTotalDescontos(formData.descontos)
    const totalBonus = calcularTotalBonus(formData.bonus)
    return bruto - totalDescontos + totalBonus
  }

  // Histórico simulado para o perfil
  const getHistoricoPagamentos = (funcionarioId: number): HistoricoPagamento[] => {
    return [
      {
        id: 1,
        periodo: '12/2023',
        valorBruto: 8000.00,
        valorLiquido: 7200.00,
        status: 'pago',
        dataPagamento: '2023-12-05'
      },
      {
        id: 2,
        periodo: '11/2023',
        valorBruto: 8000.00,
        valorLiquido: 7200.00,
        status: 'pago',
        dataPagamento: '2023-11-05'
      },
      {
        id: 3,
        periodo: '10/2023',
        valorBruto: 8000.00,
        valorLiquido: 7400.00,
        status: 'pago',
        dataPagamento: '2023-10-05'
      }
    ]
  }

  const handleAddPagamento = () => {
    if (!formData.funcionarioId || !formData.dataPagamento || !formData.valorBruto) return

    const funcionario = funcionarios.find(f => f.id === parseInt(formData.funcionarioId))
    if (!funcionario) return

    const valorBruto = parseFloat(formData.valorBruto)
    const totalDescontos = calcularTotalDescontos(formData.descontos)
    const totalBonus = calcularTotalBonus(formData.bonus)
    const valorLiquido = valorBruto - totalDescontos + totalBonus

    const novoPagamento: PagamentoFolha = {
      id: Math.max(...pagamentos.map(p => p.id), 0) + 1,
      funcionarioId: funcionario.id,
      funcionario,
      dataPagamento: formData.dataPagamento,
      periodoReferencia: formData.periodoReferencia,
      valorBruto,
      descontos: {
        inss: parseFloat(formData.descontos.inss),
        fgts: parseFloat(formData.descontos.fgts),
        impostos: parseFloat(formData.descontos.impostos),
        adiantamentos: parseFloat(formData.descontos.adiantamentos),
        outros: parseFloat(formData.descontos.outros)
      },
      bonus: {
        performance: parseFloat(formData.bonus.performance),
        ferias: parseFloat(formData.bonus.ferias),
        horaExtra: parseFloat(formData.bonus.horaExtra),
        gratificacao: parseFloat(formData.bonus.gratificacao),
        outros: parseFloat(formData.bonus.outros)
      },
      valorLiquido,
      metodoPagamento: formData.metodoPagamento || funcionario.metodoPagamento,
      dadosPagamento: formData.dadosPagamento || funcionario.dadosPagamento,
      status: formData.status,
      observacoes: formData.observacoes || undefined
    }

    setPagamentos([...pagamentos, novoPagamento])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditPagamento = (pagamento: PagamentoFolha) => {
    setEditingPagamento(pagamento)
    setFormData({
      funcionarioId: pagamento.funcionarioId.toString(),
      dataPagamento: pagamento.dataPagamento,
      periodoReferencia: pagamento.periodoReferencia,
      valorBruto: pagamento.valorBruto.toString(),
      descontos: {
        inss: pagamento.descontos.inss.toString(),
        fgts: pagamento.descontos.fgts.toString(),
        impostos: pagamento.descontos.impostos.toString(),
        adiantamentos: pagamento.descontos.adiantamentos.toString(),
        outros: pagamento.descontos.outros.toString()
      },
      bonus: {
        performance: pagamento.bonus.performance.toString(),
        ferias: pagamento.bonus.ferias.toString(),
        horaExtra: pagamento.bonus.horaExtra.toString(),
        gratificacao: pagamento.bonus.gratificacao.toString(),
        outros: pagamento.bonus.outros.toString()
      },
      metodoPagamento: pagamento.metodoPagamento,
      dadosPagamento: pagamento.dadosPagamento,
      status: pagamento.status,
      observacoes: pagamento.observacoes || ''
    })
  }

  const handleUpdatePagamento = () => {
    if (!editingPagamento || !formData.funcionarioId || !formData.dataPagamento || !formData.valorBruto) return

    const funcionario = funcionarios.find(f => f.id === parseInt(formData.funcionarioId))
    if (!funcionario) return

    const valorBruto = parseFloat(formData.valorBruto)
    const totalDescontos = calcularTotalDescontos(formData.descontos)
    const totalBonus = calcularTotalBonus(formData.bonus)
    const valorLiquido = valorBruto - totalDescontos + totalBonus

    const updatedPagamentos = pagamentos.map(pagamento =>
      pagamento.id === editingPagamento.id
        ? {
            ...pagamento,
            funcionarioId: funcionario.id,
            funcionario,
            dataPagamento: formData.dataPagamento,
            periodoReferencia: formData.periodoReferencia,
            valorBruto,
            descontos: {
              inss: parseFloat(formData.descontos.inss),
              fgts: parseFloat(formData.descontos.fgts),
              impostos: parseFloat(formData.descontos.impostos),
              adiantamentos: parseFloat(formData.descontos.adiantamentos),
              outros: parseFloat(formData.descontos.outros)
            },
            bonus: {
              performance: parseFloat(formData.bonus.performance),
              ferias: parseFloat(formData.bonus.ferias),
              horaExtra: parseFloat(formData.bonus.horaExtra),
              gratificacao: parseFloat(formData.bonus.gratificacao),
              outros: parseFloat(formData.bonus.outros)
            },
            valorLiquido,
            metodoPagamento: formData.metodoPagamento,
            dadosPagamento: formData.dadosPagamento,
            status: formData.status,
            observacoes: formData.observacoes || undefined
          }
        : pagamento
    )

    setPagamentos(updatedPagamentos)
    resetForm()
  }

  const handleDeletePagamento = (pagamentoId: number) => {
    const updatedPagamentos = pagamentos.filter(pagamento => pagamento.id !== pagamentoId)
    setPagamentos(updatedPagamentos)
  }

  const resetForm = () => {
    setFormData({
      funcionarioId: '',
      dataPagamento: '',
      periodoReferencia: '01/2024',
      valorBruto: '',
      descontos: {
        inss: '0',
        fgts: '0',
        impostos: '0',
        adiantamentos: '0',
        outros: '0'
      },
      bonus: {
        performance: '0',
        ferias: '0',
        horaExtra: '0',
        gratificacao: '0',
        outros: '0'
      },
      metodoPagamento: '',
      dadosPagamento: '',
      status: 'pendente',
      observacoes: ''
    })
    setEditingPagamento(null)
  }

  const gerarFolhaAutomatica = () => {
    const novosPagamentos = funcionarios
      .filter(f => f.ativo)
      .filter(f => !pagamentos.some(p => p.funcionarioId === f.id && p.periodoReferencia === filtros.periodo))
      .map(funcionario => ({
        id: Math.max(...pagamentos.map(p => p.id), 0) + funcionario.id,
        funcionarioId: funcionario.id,
        funcionario,
        dataPagamento: new Date().toISOString().split('T')[0],
        periodoReferencia: filtros.periodo,
        valorBruto: funcionario.salarioFixo,
        descontos: {
          inss: funcionario.tipoContrato === 'CLT' ? funcionario.salarioFixo * 0.075 : 0,
          fgts: funcionario.tipoContrato === 'CLT' ? funcionario.salarioFixo * 0.02 : 0,
          impostos: funcionario.tipoContrato === 'PJ' ? funcionario.salarioFixo * 0.035 : funcionario.salarioFixo * 0.005,
          adiantamentos: 0,
          outros: 0
        },
        bonus: {
          performance: 0,
          ferias: 0,
          horaExtra: 0,
          gratificacao: 0,
          outros: 0
        },
        valorLiquido: funcionario.tipoContrato === 'CLT' 
          ? funcionario.salarioFixo * 0.9 
          : funcionario.salarioFixo * 0.965,
        metodoPagamento: funcionario.metodoPagamento,
        dadosPagamento: funcionario.dadosPagamento,
        status: 'pendente' as const,
        observacoes: 'Gerado automaticamente'
      }))

    setPagamentos([...pagamentos, ...novosPagamentos])
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="space-y-6">
      {/* Cards com totais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total da Folha</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {totalPagamentos} pagamentos
              </Badge>
            </CardTitle>
            <CardDescription>
              Valor total da folha no período selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              US$ {totalFolha.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pagamentos Pendentes</span>
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {pagamentosPendentes}
              </Badge>
            </CardTitle>
            <CardDescription>
              Pagamentos que precisam ser processados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {pagamentosPendentes} pendentes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Período Atual</CardTitle>
            <CardDescription>
              Período de referência selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {filtros.periodo}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e ações */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={filtros.periodo} onValueChange={(value) => setFiltros({...filtros, periodo: value})}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="01/2024">01/2024</SelectItem>
              <SelectItem value="02/2024">02/2024</SelectItem>
              <SelectItem value="03/2024">03/2024</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtros.status} onValueChange={(value) => setFiltros({...filtros, status: value})}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="processando">Processando</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtros.departamento} onValueChange={(value) => setFiltros({...filtros, departamento: value})}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Depto.</SelectItem>
              {departamentos.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={gerarFolhaAutomatica}>
            <IconCalendar className="w-4 h-4 mr-2" />
            Gerar Folha
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button>
                <IconPlus className="w-4 h-4 mr-2" />
                Adicionar Pagamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Pagamento</DialogTitle>
                <DialogDescription>
                  Preencha os dados do pagamento
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="funcionario">Funcionário *</Label>
                  <Select value={formData.funcionarioId} onValueChange={(value) => {
                    const funcionario = funcionarios.find(f => f.id === parseInt(value))
                    setFormData({ 
                      ...formData, 
                      funcionarioId: value,
                      valorBruto: funcionario?.salarioFixo.toString() || '',
                      metodoPagamento: funcionario?.metodoPagamento || '',
                      dadosPagamento: funcionario?.dadosPagamento || ''
                    })
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {funcionarios.filter(f => f.ativo).map((funcionario) => (
                        <SelectItem key={funcionario.id} value={funcionario.id.toString()}>
                          {funcionario.nomeCompleto} - {funcionario.cargo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataPagamento">Data de Pagamento *</Label>
                  <Input
                    id="dataPagamento"
                    type="date"
                    value={formData.dataPagamento}
                    onChange={(e) => setFormData({ ...formData, dataPagamento: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="periodoReferencia">Período de Referência *</Label>
                  <Input
                    id="periodoReferencia"
                    value={formData.periodoReferencia}
                    onChange={(e) => setFormData({ ...formData, periodoReferencia: e.target.value })}
                    placeholder="Ex: 01/2024"
                  />
                </div>
                <div>
                  <Label htmlFor="valorBruto">Valor Bruto (US$) *</Label>
                  <Input
                    id="valorBruto"
                    type="number"
                    step="0.01"
                    value={formData.valorBruto}
                    onChange={(e) => setFormData({ ...formData, valorBruto: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                {/* Seção de Descontos */}
                <div className="col-span-2">
                  <Label>Descontos Detalhados</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    <div>
                      <Label htmlFor="inss" className="text-xs">INSS</Label>
                      <Input
                        id="inss"
                        type="number"
                        step="0.01"
                        value={formData.descontos.inss}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          descontos: { ...formData.descontos, inss: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fgts" className="text-xs">FGTS</Label>
                      <Input
                        id="fgts"
                        type="number"
                        step="0.01"
                        value={formData.descontos.fgts}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          descontos: { ...formData.descontos, fgts: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="impostos" className="text-xs">Impostos</Label>
                      <Input
                        id="impostos"
                        type="number"
                        step="0.01"
                        value={formData.descontos.impostos}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          descontos: { ...formData.descontos, impostos: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adiantamentos" className="text-xs">Adiantamentos</Label>
                      <Input
                        id="adiantamentos"
                        type="number"
                        step="0.01"
                        value={formData.descontos.adiantamentos}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          descontos: { ...formData.descontos, adiantamentos: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="outrosDescontos" className="text-xs">Outros</Label>
                      <Input
                        id="outrosDescontos"
                        type="number"
                        step="0.01"
                        value={formData.descontos.outros}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          descontos: { ...formData.descontos, outros: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção de Bônus */}
                <div className="col-span-2">
                  <Label>Bônus Detalhados</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    <div>
                      <Label htmlFor="performance" className="text-xs">Performance</Label>
                      <Input
                        id="performance"
                        type="number"
                        step="0.01"
                        value={formData.bonus.performance}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          bonus: { ...formData.bonus, performance: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ferias" className="text-xs">Férias</Label>
                      <Input
                        id="ferias"
                        type="number"
                        step="0.01"
                        value={formData.bonus.ferias}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          bonus: { ...formData.bonus, ferias: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="horaExtra" className="text-xs">Hora Extra</Label>
                      <Input
                        id="horaExtra"
                        type="number"
                        step="0.01"
                        value={formData.bonus.horaExtra}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          bonus: { ...formData.bonus, horaExtra: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gratificacao" className="text-xs">Gratificação</Label>
                      <Input
                        id="gratificacao"
                        type="number"
                        step="0.01"
                        value={formData.bonus.gratificacao}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          bonus: { ...formData.bonus, gratificacao: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="outrosBonus" className="text-xs">Outros</Label>
                      <Input
                        id="outrosBonus"
                        type="number"
                        step="0.01"
                        value={formData.bonus.outros}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          bonus: { ...formData.bonus, outros: e.target.value }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="valorLiquido">Valor Líquido (US$)</Label>
                  <Input
                    id="valorLiquido"
                    type="number"
                    step="0.01"
                    value={calcularValorLiquido().toFixed(2)}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: PagamentoFolha['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="dadosPagamento">Dados de Pagamento</Label>
                  <Input
                    id="dadosPagamento"
                    value={formData.dadosPagamento}
                    onChange={(e) => setFormData({ ...formData, dadosPagamento: e.target.value })}
                    placeholder="PIX, conta bancária, etc."
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    placeholder="Bônus, horas extras, férias..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsAddDialogOpen(false)
                  resetForm()
                }}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPagamento}>
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabela de pagamentos com scroll horizontal */}
      <Card>
        <CardHeader>
          <CardTitle>Folha de Pagamento</CardTitle>
          <CardDescription>
            Lista de todos os pagamentos do período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Cargo/Depto</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Data Pagto</TableHead>
                  <TableHead>Valor Bruto</TableHead>
                  <TableHead>Descontos</TableHead>
                  <TableHead>Bônus</TableHead>
                  <TableHead>Valor Líquido</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Tipo Contrato</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagamentosFiltrados.map((pagamento) => {
                  const StatusIcon = statusIcons[pagamento.status]
                  const totalDescontos = calcularTotalDescontos(pagamento.descontos)
                  const totalBonus = calcularTotalBonus(pagamento.bonus)
                  
                  return (
                    <TableRow key={pagamento.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto font-medium text-left"
                                onClick={() => setSelectedFuncionario(pagamento.funcionario)}
                              >
                                <IconUser className="w-4 h-4 mr-1" />
                                {pagamento.funcionario.nomeCompleto}
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                  <IconUser className="w-5 h-5" />
                                  Perfil do Funcionário
                                </SheetTitle>
                                <SheetDescription>
                                  Informações detalhadas de {selectedFuncionario?.nomeCompleto}
                                </SheetDescription>
                              </SheetHeader>
                              
                              {selectedFuncionario && (
                                <Tabs defaultValue="pessoais" className="mt-6">
                                  <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="pessoais">Pessoais</TabsTrigger>
                                    <TabsTrigger value="financeiros">Financeiros</TabsTrigger>
                                    <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
                                    <TabsTrigger value="historico">Histórico</TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="pessoais" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Nome Completo</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.nomeCompleto}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">CPF/CNPJ</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.cpfCnpj}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Cargo</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.cargo}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Departamento</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.departamento}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Tipo de Contrato</Label>
                                        <Badge variant="outline">{selectedFuncionario.tipoContrato}</Badge>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Data de Admissão</Label>
                                        <p className="text-sm text-muted-foreground">{formatDate(selectedFuncionario.dataAdmissao)}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">E-mail</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.email}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Telefone</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.telefone}</p>
                                      </div>
                                    </div>
                                    {selectedFuncionario.observacoes && (
                                      <div>
                                        <Label className="text-sm font-medium">Observações</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.observacoes}</p>
                                      </div>
                                    )}
                                  </TabsContent>
                                  
                                  <TabsContent value="financeiros" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Salário Bruto</Label>
                                        <p className="text-lg font-mono font-bold text-green-600">
                                          US$ {selectedFuncionario.salarioFixo.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Status</Label>
                                        <Badge variant={selectedFuncionario.ativo ? "default" : "secondary"}>
                                          {selectedFuncionario.ativo ? "Ativo" : "Inativo"}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <Label className="text-sm font-medium mb-2 block">Descontos Padrão (CLT)</Label>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>INSS (7.5%):</span>
                                          <span className="font-mono">US$ {(selectedFuncionario.salarioFixo * 0.075).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>FGTS (2%):</span>
                                          <span className="font-mono">US$ {(selectedFuncionario.salarioFixo * 0.02).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>IR (0.5%):</span>
                                          <span className="font-mono">US$ {(selectedFuncionario.salarioFixo * 0.005).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-medium">
                                          <span>Total:</span>
                                          <span className="font-mono text-red-600">US$ {(selectedFuncionario.salarioFixo * 0.1).toFixed(2)}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-muted p-3 rounded-md">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">Valor Líquido Estimado:</span>
                                        <span className="font-mono font-bold text-green-600">
                                          US$ {(selectedFuncionario.salarioFixo * 0.9).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="pagamento" className="space-y-4">
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-sm font-medium">Método de Pagamento</Label>
                                        <p className="text-sm text-muted-foreground">{selectedFuncionario.metodoPagamento}</p>
                                      </div>
                                      
                                      {selectedFuncionario.chavePix && (
                                        <div>
                                          <Label className="text-sm font-medium">Chave PIX</Label>
                                          <p className="text-sm text-muted-foreground font-mono">{selectedFuncionario.chavePix}</p>
                                        </div>
                                      )}
                                      
                                      {selectedFuncionario.enderecoUsdt && (
                                        <div>
                                          <Label className="text-sm font-medium">Endereço USDT</Label>
                                          <p className="text-sm text-muted-foreground font-mono break-all">{selectedFuncionario.enderecoUsdt}</p>
                                        </div>
                                      )}
                                      
                                      {selectedFuncionario.banco && (
                                        <div className="grid grid-cols-3 gap-2">
                                          <div>
                                            <Label className="text-sm font-medium">Banco</Label>
                                            <p className="text-sm text-muted-foreground">{selectedFuncionario.banco}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Agência</Label>
                                            <p className="text-sm text-muted-foreground">{selectedFuncionario.agencia}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Conta</Label>
                                            <p className="text-sm text-muted-foreground">{selectedFuncionario.conta}</p>
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="bg-muted p-3 rounded-md">
                                        <Label className="text-sm font-medium">Dados Completos</Label>
                                        <p className="text-sm text-muted-foreground font-mono">{selectedFuncionario.dadosPagamento}</p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="historico" className="space-y-4">
                                    <div>
                                      <Label className="text-sm font-medium mb-3 block">Histórico de Pagamentos</Label>
                                      <div className="space-y-2">
                                        {getHistoricoPagamentos(selectedFuncionario.id).map((historico) => (
                                          <div key={historico.id} className="flex items-center justify-between p-3 border rounded-md">
                                            <div>
                                              <p className="font-medium">{historico.periodo}</p>
                                              <p className="text-sm text-muted-foreground">{formatDate(historico.dataPagamento)}</p>
                                            </div>
                                            <div className="text-right">
                                              <p className="font-mono font-medium">US$ {historico.valorLiquido.toFixed(2)}</p>
                                              <Badge variant="outline" className="text-xs">
                                                {historico.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="bg-muted p-3 rounded-md">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">Total Pago (Últimos 3 meses):</span>
                                        <span className="font-mono font-bold text-green-600">
                                          US$ {getHistoricoPagamentos(selectedFuncionario.id)
                                            .reduce((sum, h) => sum + h.valorLiquido, 0).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              )}
                            </SheetContent>
                          </Sheet>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pagamento.funcionario.cargo}</div>
                          <div className="text-xs text-muted-foreground">
                            {pagamento.funcionario.departamento}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{pagamento.periodoReferencia}</TableCell>
                      <TableCell>{formatDate(pagamento.dataPagamento)}</TableCell>
                      <TableCell className="font-mono">
                        US$ {pagamento.valorBruto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="font-mono text-red-600">
                        -US$ {totalDescontos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="font-mono text-green-600">
                        +US$ {totalBonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="font-mono font-bold text-blue-600">
                        US$ {pagamento.valorLiquido.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <div className={`w-2 h-2 rounded-full ${statusColors[pagamento.status]}`} />
                          <StatusIcon className="w-3 h-3" />
                          {pagamento.status.charAt(0).toUpperCase() + pagamento.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{pagamento.metodoPagamento}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {pagamento.funcionario.tipoContrato}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditPagamento(pagamento)}
                              >
                                <IconPencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Editar Pagamento</DialogTitle>
                                <DialogDescription>
                                  Modifique os dados do pagamento
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-funcionario">Funcionário</Label>
                                  <Select value={formData.funcionarioId} onValueChange={(value) => {
                                    const funcionario = funcionarios.find(f => f.id === parseInt(value))
                                    setFormData({ 
                                      ...formData, 
                                      funcionarioId: value,
                                      metodoPagamento: funcionario?.metodoPagamento || formData.metodoPagamento,
                                      dadosPagamento: funcionario?.dadosPagamento || formData.dadosPagamento
                                    })
                                  }}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {funcionarios.filter(f => f.ativo).map((funcionario) => (
                                        <SelectItem key={funcionario.id} value={funcionario.id.toString()}>
                                          {funcionario.nomeCompleto} - {funcionario.cargo}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-data">Data de Pagamento</Label>
                                  <Input
                                    id="edit-data"
                                    type="date"
                                    value={formData.dataPagamento}
                                    onChange={(e) => setFormData({ ...formData, dataPagamento: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-valor">Valor Bruto (US$)</Label>
                                  <Input
                                    id="edit-valor"
                                    type="number"
                                    step="0.01"
                                    value={formData.valorBruto}
                                    onChange={(e) => setFormData({ ...formData, valorBruto: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select value={formData.status} onValueChange={(value: PagamentoFolha['status']) => setFormData({ ...formData, status: value })}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {statusOptions.map((status) => (
                                        <SelectItem key={status} value={status}>
                                          {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-periodo">Período</Label>
                                  <Input
                                    id="edit-periodo"
                                    value={formData.periodoReferencia}
                                    onChange={(e) => setFormData({ ...formData, periodoReferencia: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-liquido">Valor Líquido</Label>
                                  <Input
                                    id="edit-liquido"
                                    type="number"
                                    step="0.01"
                                    value={calcularValorLiquido().toFixed(2)}
                                    disabled
                                    className="bg-muted"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingPagamento(null)}>
                                  Cancelar
                                </Button>
                                <Button onClick={handleUpdatePagamento}>
                                  Salvar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
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
                                  Tem certeza que deseja excluir este pagamento? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePagamento(pagamento.id)}
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
                  )
                })}
              </TableBody>
            </Table>
          </div>
          
          {pagamentosFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum pagamento encontrado para os filtros selecionados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}