'use client'

import * as React from 'react'
import { IconPlus, IconPencil, IconTrash, IconCheck, IconX } from '@tabler/icons-react'
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

interface Account {
  id: number
  name: string
  value: number
  percentage: number
  color: string
}

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
  const [accounts, setAccounts] = React.useState<Account[]>([
    {
      id: 1,
      name: "GUARDA",
      value: 7367.39,
      percentage: 2.2,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "OLD GOLD (BTC)",
      value: 24300.05,
      percentage: 7.4,
      color: "bg-yellow-500",
    },
    {
      id: 3,
      name: "PAY RETAILERS",
      value: 128383.86,
      percentage: 39.2,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "SCALA",
      value: 9695.84,
      percentage: 3.0,
      color: "bg-indigo-500",
    },
    {
      id: 5,
      name: "CRYPTO PAY",
      value: 6550.52,
      percentage: 2.0,
      color: "bg-orange-500",
    },
    {
      id: 6,
      name: "NEW GOLD",
      value: 144562.17,
      percentage: 44.1,
      color: "bg-green-500",
    },
    {
      id: 7,
      name: "NEW GOLD 2",
      value: 0.00,
      percentage: 0.0,
      color: "bg-gray-400",
    },
    {
      id: 8,
      name: "ADS (Conta Simples)",
      value: 6700.00,
      percentage: 2.0,
      color: "bg-pink-500",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingAccount, setEditingAccount] = React.useState<Account | null>(null)
  const [formData, setFormData] = React.useState({
    name: '',
    value: '',
    color: 'bg-blue-500'
  })

  const totalValue = accounts.reduce((sum, account) => sum + account.value, 0)

  const calculatePercentages = (accountsList: Account[]) => {
    const total = accountsList.reduce((sum, account) => sum + account.value, 0)
    return accountsList.map(account => ({
      ...account,
      percentage: total > 0 ? Number(((account.value / total) * 100).toFixed(1)) : 0
    }))
  }

  const handleAddAccount = () => {
    if (!formData.name || !formData.value) return

    const newAccount: Account = {
      id: Math.max(...accounts.map(a => a.id), 0) + 1,
      name: formData.name,
      value: parseFloat(formData.value),
      percentage: 0,
      color: formData.color
    }

    const updatedAccounts = calculatePercentages([...accounts, newAccount])
    setAccounts(updatedAccounts)
    setFormData({ name: '', value: '', color: 'bg-blue-500' })
    setIsAddDialogOpen(false)
  }

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account)
    setFormData({
      name: account.name,
      value: account.value.toString(),
      color: account.color
    })
  }

  const handleUpdateAccount = () => {
    if (!editingAccount || !formData.name || !formData.value) return

    const updatedAccounts = accounts.map(account =>
      account.id === editingAccount.id
        ? {
            ...account,
            name: formData.name,
            value: parseFloat(formData.value),
            color: formData.color
          }
        : account
    )

    const accountsWithPercentages = calculatePercentages(updatedAccounts)
    setAccounts(accountsWithPercentages)
    setEditingAccount(null)
    setFormData({ name: '', value: '', color: 'bg-blue-500' })
  }

  const handleDeleteAccount = (accountId: number) => {
    const updatedAccounts = accounts.filter(account => account.id !== accountId)
    const accountsWithPercentages = calculatePercentages(updatedAccounts)
    setAccounts(accountsWithPercentages)
  }

  const resetForm = () => {
    setFormData({ name: '', value: '', color: 'bg-blue-500' })
    setEditingAccount(null)
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <IconPlus className="w-4 h-4 mr-2" />
              Adicionar Conta
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                  placeholder="Ex: CONTA CORRENTE"
                />
              </div>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
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
                      <DialogContent>
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
                          <Button variant="outline" onClick={resetForm}>
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