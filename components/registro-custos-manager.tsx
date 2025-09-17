'use client'

import * as React from 'react'
import { IconPlus, IconPencil, IconTrash, IconCalendar, IconExternalLink, IconDownload, IconFilter } from '@tabler/icons-react'
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

interface RegistroCusto {
  id: number
  data: string
  categoria: 'Marketing' | 'Operação' | 'Serviço' | 'Outro'
  descricao: string
  metodoPagamento: string
  valor: number
  responsavel: string
  projeto?: string
  contaUsada: 'Conta Simples' | 'Carteira' | 'Fisico'
}

const categorias = ['Marketing', 'Operação', 'Serviço', 'Outro']
const metodosPagamento = ['Cartão de Crédito', 'Cartão de Débito', 'Transferência', 'Boleto', 'PIX', 'Dinheiro', 'Outro']
const contasDisponiveis = ['Conta Simples', 'Carteira', 'Fisico']

const categoriaCores = {
  'Marketing': 'bg-blue-500',
  'Operação': 'bg-green-500', 
  'Serviço': 'bg-purple-500',
  'Outro': 'bg-gray-500'
}

export function RegistroCustosManager() {
  const [registros, setRegistros] = React.useState<RegistroCusto[]>([
    {
      id: 1,
      data: '2024-01-15',
      categoria: 'Marketing',
      descricao: 'Campanha Google Ads - Janeiro',
      metodoPagamento: 'Cartão de Crédito',
      valor: 2500.00,
      responsavel: 'João Silva',
      projeto: 'Campanha Q1',
      contaUsada: 'Conta Simples'
    },
    {
      id: 2,
      data: '2024-01-18',
      categoria: 'Operação',
      descricao: 'Servidores AWS - Mensalidade',
      metodoPagamento: 'Transferência',
      valor: 1200.00,
      responsavel: 'Maria Santos',
      projeto: 'Infraestrutura',
      contaUsada: 'Conta Simples'
    },
    {
      id: 3,
      data: '2024-01-20',
      categoria: 'Serviço',
      descricao: 'Consultoria em TI',
      metodoPagamento: 'Boleto',
      valor: 3500.00,
      responsavel: 'Carlos Lima',
      contaUsada: 'Carteira'
    },
    {
      id: 4,
      data: '2024-01-22',
      categoria: 'Outro',
      descricao: 'Material de escritório',
      metodoPagamento: 'Cartão de Débito',
      valor: 450.00,
      responsavel: 'Ana Costa',
      contaUsada: 'Fisico'
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingRegistro, setEditingRegistro] = React.useState<RegistroCusto | null>(null)
  const [formData, setFormData] = React.useState({
    data: '',
    categoria: 'Marketing' as RegistroCusto['categoria'],
    descricao: '',
    metodoPagamento: '',
    valor: '',
    responsavel: '',
    projeto: '',
    contaUsada: 'Conta Simples' as RegistroCusto['contaUsada']
  })

  const totalCustos = registros.reduce((sum, registro) => sum + registro.valor, 0)

  // Calcular custos do mês atual
  const [custosMesAtual, setCustosMesAtual] = React.useState(0)
  const [registrosMesAtual, setRegistrosMesAtual] = React.useState(0)

  React.useEffect(() => {
    const agora = new Date()
    const mesAtual = agora.getMonth()
    const anoAtual = agora.getFullYear()
    
    const registrosDoMes = registros.filter(registro => {
      const dataRegistro = new Date(registro.data)
      return dataRegistro.getMonth() === mesAtual && dataRegistro.getFullYear() === anoAtual
    })
    
    const totalMes = registrosDoMes.reduce((sum, registro) => sum + registro.valor, 0)
    setCustosMesAtual(totalMes)
    setRegistrosMesAtual(registrosDoMes.length)
  }, [registros])

  const handleAddRegistro = () => {
    if (!formData.data || !formData.descricao || !formData.valor || !formData.responsavel || !formData.metodoPagamento) return

    const novoRegistro: RegistroCusto = {
      id: Math.max(...registros.map(r => r.id), 0) + 1,
      data: formData.data,
      categoria: formData.categoria,
      descricao: formData.descricao,
      metodoPagamento: formData.metodoPagamento,
      valor: parseFloat(formData.valor),
      responsavel: formData.responsavel,
      projeto: formData.projeto || undefined,
      contaUsada: formData.contaUsada
    }

    setRegistros([...registros, novoRegistro])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditRegistro = (registro: RegistroCusto) => {
    setEditingRegistro(registro)
    setFormData({
      data: registro.data,
      categoria: registro.categoria,
      descricao: registro.descricao,
      metodoPagamento: registro.metodoPagamento,
      valor: registro.valor.toString(),
      responsavel: registro.responsavel,
      projeto: registro.projeto || '',
      contaUsada: registro.contaUsada
    })
  }

  const handleUpdateRegistro = () => {
    if (!editingRegistro || !formData.data || !formData.descricao || !formData.valor || !formData.responsavel || !formData.metodoPagamento) return

    const updatedRegistros = registros.map(registro =>
      registro.id === editingRegistro.id
        ? {
            ...registro,
            data: formData.data,
            categoria: formData.categoria,
            descricao: formData.descricao,
            metodoPagamento: formData.metodoPagamento,
            valor: parseFloat(formData.valor),
            responsavel: formData.responsavel,
            projeto: formData.projeto || undefined,
            contaUsada: formData.contaUsada
          }
        : registro
    )

    setRegistros(updatedRegistros)
    resetForm()
  }

  const handleDeleteRegistro = (registroId: number) => {
    const updatedRegistros = registros.filter(registro => registro.id !== registroId)
    setRegistros(updatedRegistros)
  }

  const resetForm = () => {
    setFormData({
      data: '',
      categoria: 'Marketing',
      descricao: '',
      metodoPagamento: '',
      valor: '',
      responsavel: '',
      projeto: '',
      contaUsada: 'Conta Simples'
    })
    setEditingRegistro(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const openExternalForm = () => {
    // Simular abertura de página externa
    window.open('/registro-custos-externo', '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Cards com totais de custos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total de Custos Registrados</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {registros.length} registros
              </Badge>
            </CardTitle>
            <CardDescription>
              Valor total dos gastos registrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              US$ {totalCustos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total de Custos Este Mês</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {registrosMesAtual} registros
              </Badge>
            </CardTitle>
            <CardDescription>
              Valor dos gastos registrados no mês atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              US$ {custosMesAtual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header com botões de ação */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Registros de Custos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie todos os gastos da empresa
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openExternalForm}>
            <IconExternalLink className="w-4 h-4 mr-2" />
            Formulário Externo
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button>
                <IconPlus className="w-4 h-4 mr-2" />
                Adicionar Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Registro de Custo</DialogTitle>
                <DialogDescription>
                  Preencha os dados do gasto realizado
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data">Data *</Label>
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select value={formData.categoria} onValueChange={(value: RegistroCusto['categoria']) => setFormData({ ...formData, categoria: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${categoriaCores[categoria as keyof typeof categoriaCores]}`} />
                            {categoria}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Ex: Campanha Google Ads, Servidores AWS..."
                  />
                </div>
                <div>
                  <Label htmlFor="metodoPagamento">Método de Pagamento *</Label>
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
                  <Label htmlFor="valor">Valor (US$) *</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="responsavel">Responsável *</Label>
                  <Input
                    id="responsavel"
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                    placeholder="Nome do responsável"
                  />
                </div>
                <div>
                  <Label htmlFor="contaUsada">Conta Usada *</Label>
                  <Select value={formData.contaUsada} onValueChange={(value: RegistroCusto['contaUsada']) => setFormData({ ...formData, contaUsada: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contasDisponiveis.map((conta) => (
                        <SelectItem key={conta} value={conta}>
                          {conta}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="projeto">Projeto/Centro de Custo</Label>
                  <Input
                    id="projeto"
                    value={formData.projeto}
                    onChange={(e) => setFormData({ ...formData, projeto: e.target.value })}
                    placeholder="Ex: Campanha Q1, Infraestrutura..."
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
                <Button onClick={handleAddRegistro}>
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabela de registros */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Registros</CardTitle>
          <CardDescription>
            Lista completa de todos os custos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registros.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell>{formatDate(registro.data)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <div className={`w-2 h-2 rounded-full ${categoriaCores[registro.categoria]}`} />
                      {registro.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={registro.descricao}>
                      {registro.descricao}
                    </div>
                    {registro.projeto && (
                      <div className="text-xs text-muted-foreground">
                        {registro.projeto}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{registro.metodoPagamento}</TableCell>
                  <TableCell className="font-mono font-medium">
                    US$ {registro.valor.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{registro.responsavel}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {registro.contaUsada}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditRegistro(registro)}
                          >
                            <IconPencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Registro</DialogTitle>
                            <DialogDescription>
                              Modifique os dados do registro
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-data">Data</Label>
                              <Input
                                id="edit-data"
                                type="date"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-categoria">Categoria</Label>
                              <Select value={formData.categoria} onValueChange={(value: RegistroCusto['categoria']) => setFormData({ ...formData, categoria: value })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categorias.map((categoria) => (
                                    <SelectItem key={categoria} value={categoria}>
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${categoriaCores[categoria as keyof typeof categoriaCores]}`} />
                                        {categoria}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="edit-descricao">Descrição</Label>
                              <Textarea
                                id="edit-descricao"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-valor">Valor (US$)</Label>
                              <Input
                                id="edit-valor"
                                type="number"
                                step="0.01"
                                value={formData.valor}
                                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-responsavel">Responsável</Label>
                              <Input
                                id="edit-responsavel"
                                value={formData.responsavel}
                                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingRegistro(null)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleUpdateRegistro}>
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
                              Tem certeza que deseja excluir este registro? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteRegistro(registro.id)}
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
          
          {registros.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum registro encontrado. Adicione o primeiro registro de custo.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}