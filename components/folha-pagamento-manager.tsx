'use client'

import * as React from 'react'
import { IconPlus, IconPencil, IconTrash, IconCalendar, IconFilter, IconDownload, IconCheck, IconClock, IconLoader } from '@tabler/icons-react'
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

interface Funcionario {
  id: number
  nome: string
  cargo: string
  departamento: string
  salarioFixo: number
  metodoPagamento: string
  dadosPagamento: string
  ativo: boolean
}

interface PagamentoFolha {
  id: number
  funcionarioId: number
  funcionario: Funcionario
  dataPagamento: string
  periodoReferencia: string
  valorBruto: number
  descontos: number
  valorLiquido: number
  metodoPagamento: string
  dadosPagamento: string
  status: 'pago' | 'pendente' | 'processando'
  observacoes?: string
}

const departamentos = ['Tecnologia', 'Marketing', 'Vendas', 'Financeiro', 'RH', 'Operações']
const metodosPagamento = ['PIX', 'Transferência', 'Boleto', 'Cheque', 'Carteira Digital']
const statusOptions = ['pago', 'pendente', 'processando']

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
  // Dados de funcionários cadastrados
  const [funcionarios] = React.useState<Funcionario[]>([
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor Senior',
      departamento: 'Tecnologia',
      salarioFixo: 8000.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'joao.silva@email.com',
      ativo: true
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Gerente de Marketing',
      departamento: 'Marketing',
      salarioFixo: 12000.00,
      metodoPagamento: 'Transferência',
      dadosPagamento: 'Banco: 001 | Ag: 1234 | CC: 56789-0',
      ativo: true
    },
    {
      id: 3,
      nome: 'Carlos Lima',
      cargo: 'Analista Financeiro',
      departamento: 'Financeiro',
      salarioFixo: 6500.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'carlos.lima@email.com',
      ativo: true
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Designer UX/UI',
      departamento: 'Tecnologia',
      salarioFixo: 7000.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'ana.costa@email.com',
      ativo: true
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
      descontos: 800.00,
      valorLiquido: 7200.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'joao.silva@email.com',
      status: 'pago',
      observacoes: 'Salário regular'
    },
    {
      id: 2,
      funcionarioId: 2,
      funcionario: funcionarios[1],
      dataPagamento: '2024-01-05',
      periodoReferencia: '01/2024',
      valorBruto: 12000.00,
      descontos: 1200.00,
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
      descontos: 650.00,
      valorLiquido: 5850.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'carlos.lima@email.com',
      status: 'pendente'
    },
    {
      id: 4,
      funcionarioId: 4,
      funcionario: funcionarios[3],
      dataPagamento: '2024-01-05',
      periodoReferencia: '01/2024',
      valorBruto: 7500.00,
      descontos: 750.00,
      valorLiquido: 6750.00,
      metodoPagamento: 'PIX',
      dadosPagamento: 'ana.costa@email.com',
      status: 'processando',
      observacoes: 'Bônus de R$ 500 incluído'
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingPagamento, setEditingPagamento] = React.useState<PagamentoFolha | null>(null)
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
    descontos: '0',
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

  const handleAddPagamento = () => {
    if (!formData.funcionarioId || !formData.dataPagamento || !formData.valorBruto) return

    const funcionario = funcionarios.find(f => f.id === parseInt(formData.funcionarioId))
    if (!funcionario) return

    const valorBruto = parseFloat(formData.valorBruto)
    const descontos = parseFloat(formData.descontos) || 0
    const valorLiquido = valorBruto - descontos

    const novoPagamento: PagamentoFolha = {
      id: Math.max(...pagamentos.map(p => p.id), 0) + 1,
      funcionarioId: funcionario.id,
      funcionario,
      dataPagamento: formData.dataPagamento,
      periodoReferencia: formData.periodoReferencia,
      valorBruto,
      descontos,
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
      descontos: pagamento.descontos.toString(),
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
    const descontos = parseFloat(formData.descontos) || 0
    const valorLiquido = valorBruto - descontos

    const updatedPagamentos = pagamentos.map(pagamento =>
      pagamento.id === editingPagamento.id
        ? {
            ...pagamento,
            funcionarioId: funcionario.id,
            funcionario,
            dataPagamento: formData.dataPagamento,
            periodoReferencia: formData.periodoReferencia,
            valorBruto,
            descontos,
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
      descontos: '0',
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
        descontos: funcionario.salarioFixo * 0.1, // 10% de desconto padrão
        valorLiquido: funcionario.salarioFixo * 0.9,
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                          {funcionario.nome} - {funcionario.cargo}
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
                <div>
                  <Label htmlFor="valorLiquido">Valor Líquido (US$)</Label>
                  <Input
                    id="valorLiquido"
                    type="number"
                    step="0.01"
                    value={(parseFloat(formData.valorBruto || '0') - parseFloat(formData.descontos || '0')).toFixed(2)}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="metodoPagamento">Método de Pagamento</Label>
                  <Select value={formData.metodoPagamento} onValueChange={(value) => setFormData({ ...formData, metodoPagamento: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      {metodosPagamento.map((metodo) => (
                        <SelectItem key={metodo} value={metodo}>
                          {metodo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

      {/* Tabela de pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Folha de Pagamento</CardTitle>
          <CardDescription>
            Lista de todos os pagamentos do período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Cargo/Depto</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Data Pagto</TableHead>
                <TableHead>Valor Bruto</TableHead>
                <TableHead>Descontos</TableHead>
                <TableHead>Valor Líquido</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagamentosFiltrados.map((pagamento) => {
                const StatusIcon = statusIcons[pagamento.status]
                return (
                  <TableRow key={pagamento.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{pagamento.funcionario.nome}</div>
                        <div className="text-xs text-muted-foreground">
                          {pagamento.metodoPagamento}
                        </div>
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
                      -US$ {pagamento.descontos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="font-mono font-bold text-green-600">
                      US$ {pagamento.valorLiquido.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <div className={`w-2 h-2 rounded-full ${statusColors[pagamento.status]}`} />
                        <StatusIcon className="w-3 h-3" />
                        {pagamento.status.charAt(0).toUpperCase() + pagamento.status.slice(1)}
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
                                        {funcionario.nome} - {funcionario.cargo}
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
                                <Label htmlFor="edit-descontos">Descontos (US$)</Label>
                                <Input
                                  id="edit-descontos"
                                  type="number"
                                  step="0.01"
                                  value={formData.descontos}
                                  onChange={(e) => setFormData({ ...formData, descontos: e.target.value })}
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