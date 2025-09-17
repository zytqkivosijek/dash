'use client'

import * as React from 'react'
import { IconPlus, IconPencil, IconTrash, IconCheck, IconX, IconLoader, IconUpload } from '@tabler/icons-react'
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

import { getTronBalance } from '@/lib/tron-api'
import { getAccounts, createAccount, updateAccount, deleteAccount, updateAccountPercentages } from '@/lib/accounts-service'
import { Database } from '@/types/database'

type Account = Database['public']['Tables']['accounts']['Row']

const colorOptions = [
  { value: 'bg-blue-500', label: 'Azul', color: '#3b82f6' },
  { value: 'bg-yellow-500', label: 'Amarelo', color: '#eab308' },
  { value: 'bg-purple-500', label: 'Roxo', color: '#a855f7' },
  { value: 'bg-indigo-500', label: 'Índigo', color: '#6366f1' },
  { value: 'bg-orange-500', label: 'Laranja', color: '#f97316' },
  { value: 'bg-green-500', label: 'Verde', color: '#22c55e' },
  { value: 'bg-red-500', label: 'Vermelho', color: '#ef4444' },
  { value: 'bg-pink-500', label: 'Rosa', color: '#ec4899' },
  { value: 'bg-gray-400', label: 'Cinza', color: '#9ca3af' },
  { value: 'bg-teal-500', label: 'Teal', color: '#14b8a6' },
]

export function ContasAtivasManager() {
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingAccount, setEditingAccount] = React.useState<Account | null>(null)
  const [valueInputType, setValueInputType] = React.useState<'manual' | 'tron'>('manual')
  const [isLoadingTron, setIsLoadingTron] = React.useState(false)
  const [tronAddress, setTronAddress] = React.useState('')
  const [tronBalances, setTronBalances] = React.useState<any>(null)
  const [selectedToken, setSelectedToken] = React.useState<string>('')
  const [logoFile, setLogoFile] = React.useState<File | null>(null)
  const [logoPreview, setLogoPreview] = React.useState<string>('')
  const [formData, setFormData] = React.useState({
    name: '',
    value: '',
    color: 'bg-blue-500'
  })

  // Carregar contas do Supabase
  React.useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    setIsLoading(true)
    try {
      const data = await getAccounts()
      setAccounts(data)
    } catch (error) {
      console.error('Error loading accounts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalValue = accounts.reduce((sum, account) => sum + account.value, 0)

  const handleAddAccount = async () => {
    if (!formData.name || !formData.value) return

    try {
      const newAccount = await createAccount({
        name: formData.name,
        value: parseFloat(formData.value),
        color: formData.color,
        logo_url: logoPreview || null
      })

      if (newAccount) {
        await loadAccounts() // Recarregar para recalcular percentuais
        resetForm()
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error('Error adding account:', error)
    }
  }

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account)
    setFormData({
      name: account.name,
      value: account.value.toString(),
      color: account.color
    })
    setLogoPreview(account.logo_url || '')
  }

  const handleUpdateAccount = async () => {
    if (!editingAccount || !formData.name || !formData.value) return

    try {
      await updateAccount(editingAccount.id, {
        name: formData.name,
        value: parseFloat(formData.value),
        color: formData.color,
        logo_url: logoPreview || null
      })

      await loadAccounts() // Recarregar para recalcular percentuais
      resetForm()
    } catch (error) {
      console.error('Error updating account:', error)
    }
  }

  const handleDeleteAccount = async (accountId: string) => {
    try {
      await deleteAccount(accountId)
      await loadAccounts() // Recarregar para recalcular percentuais
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', value: '', color: 'bg-blue-500' })
    setEditingAccount(null)
    setValueInputType('manual')
    setTronAddress('')
    setTronBalances(null)
    setSelectedToken('')
    setLogoFile(null)
    setLogoPreview('')
    setIsLoadingTron(false)
  }

  const handleTronAddressSubmit = async () => {
    if (!tronAddress.trim()) return
    
    setIsLoadingTron(true)
    try {
      const balances = await getTronBalance(tronAddress.trim())
      setTronBalances(balances)
      
      // Auto-selecionar TRX se disponível
      if (balances.TRX > 0) {
        setSelectedToken('TRX')
        setFormData(prev => ({ ...prev, value: balances.TRX.toString() }))
      }
    } catch (error) {
      console.error('Erro ao buscar saldo Tron:', error)
      alert('Erro ao buscar saldo. Verifique o endereço e tente novamente.')
    } finally {
      setIsLoadingTron(false)
    }
  }

  const handleTokenSelect = (token: string, balance: number) => {
    setSelectedToken(token)
    setFormData(prev => ({ ...prev, value: balance.toString() }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com botão de adicionar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Gerenciar Contas</h2>
          <p className="text-sm text-muted-foreground">
            Total: US$ {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <IconPlus className="w-4 h-4 mr-2" />
              Adicionar Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Conta</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova conta financeira
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Conta</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Conta Principal"
                />
              </div>
              
              <div>
                <Label>Aparência</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="use-color"
                        name="appearance"
                        checked={!logoPreview}
                        onChange={() => {
                          setLogoFile(null)
                          setLogoPreview('')
                        }}
                      />
                      <Label htmlFor="use-color">Usar cor</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="use-logo"
                        name="appearance"
                        checked={!!logoPreview}
                        onChange={() => {}}
                      />
                      <Label htmlFor="use-logo">Usar logo</Label>
                    </div>
                  </div>
                  
                  {!logoPreview ? (
                    <div>
                      <Label htmlFor="color">Cor</Label>
                      <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${option.value}`} />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img src={logoPreview} alt="Logo preview" className="w-8 h-8 rounded-full object-cover" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setLogoFile(null)
                          setLogoPreview('')
                        }}
                      >
                        Remover logo
                      </Button>
                    </div>
                  )}
                  
                  {!logoPreview && (
                    <div>
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 p-2 border border-dashed rounded-md hover:bg-accent">
                          <IconUpload className="w-4 h-4" />
                          <span className="text-sm">Clique para fazer upload do logo</span>
                        </div>
                      </Label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Como definir o valor?</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="manual-value"
                        name="valueType"
                        checked={valueInputType === 'manual'}
                        onChange={() => {
                          setValueInputType('manual')
                          setTronBalances(null)
                          setTronAddress('')
                          setSelectedToken('')
                        }}
                      />
                      <Label htmlFor="manual-value">Valor manual</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="tron-value"
                        name="valueType"
                        checked={valueInputType === 'tron'}
                        onChange={() => {
                          setValueInputType('tron')
                          setFormData(prev => ({ ...prev, value: '' }))
                        }}
                      />
                      <Label htmlFor="tron-value">Endereço Tron</Label>
                    </div>
                  </div>

                  {valueInputType === 'manual' ? (
                    <div>
                      <Label htmlFor="value">Valor (US$)</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="tron-address">Endereço Tron</Label>
                        <div className="flex gap-2">
                          <Input
                            id="tron-address"
                            value={tronAddress}
                            onChange={(e) => setTronAddress(e.target.value)}
                            placeholder="Ex: TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH"
                          />
                          <Button
                            type="button"
                            onClick={handleTronAddressSubmit}
                            disabled={isLoadingTron || !tronAddress.trim()}
                          >
                            {isLoadingTron ? (
                              <IconLoader className="w-4 h-4 animate-spin" />
                            ) : (
                              'Buscar'
                            )}
                          </Button>
                        </div>
                      </div>

                      {tronBalances && (
                        <div>
                          <Label>Selecione o token</Label>
                          <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                            {tronBalances.TRX > 0 && (
                              <div
                                className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${
                                  selectedToken === 'TRX' ? 'border-primary bg-accent' : ''
                                }`}
                                onClick={() => handleTokenSelect('TRX', tronBalances.TRX)}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">TRX</span>
                                  <span>{tronBalances.TRX.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                                </div>
                              </div>
                            )}
                            {Object.entries(tronBalances.TRC20).map(([symbol, balance]) => (
                              <div
                                key={symbol}
                                className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${
                                  selectedToken === symbol ? 'border-primary bg-accent' : ''
                                }`}
                                onClick={() => handleTokenSelect(symbol, balance as number)}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{symbol}</span>
                                  <span>{(balance as number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {selectedToken && (
                            <div className="mt-3">
                              <Label htmlFor="selected-value">Valor selecionado (US$)</Label>
                              <Input
                                id="selected-value"
                                type="number"
                                step="0.01"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                placeholder="0.00"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                resetForm()
              }}>
                Cancelar
              </Button>
              <Button onClick={handleAddAccount}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de contas */}
      <div className="grid gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${account.color}`} />
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {account.percentage}% do total
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-mono font-medium">
                      US$ {account.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="w-16 h-1 bg-muted rounded-full mt-1">
                      <div
                        className={`h-full rounded-full ${account.color}`}
                        style={{ width: `${Math.max(account.percentage * 2, 2)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditAccount(account)}
                        >
                          <IconPencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Editar Conta</DialogTitle>
                          <DialogDescription>
                            Modifique os dados da conta
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Nome da Conta</Label>
                            <Input
                              id="edit-name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-value">Valor (US$)</Label>
                            <Input
                              id="edit-value"
                              type="number"
                              step="0.01"
                              value={formData.value}
                              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-color">Cor</Label>
                            <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {colorOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-4 h-4 rounded-full ${option.value}`} />
                                      {option.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setEditingAccount(null)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleUpdateAccount}>
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
                            Tem certeza que deseja excluir a conta "{account.name}"? 
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteAccount(account.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhuma conta cadastrada. Clique em "Adicionar Conta" para começar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}