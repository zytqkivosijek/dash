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

interface Cost {
  id: number
  name: string
  value: number
  percentage: number
  color: string
}

import { getCosts, createCost, updateCost, deleteCost, updateCostPercentages } from '@/lib/costs-service'
import { Database } from '@/types/database'

type Cost = Database['public']['Tables']['costs']['Row']

const colorOptions = [
  { value: 'bg-red-500', label: 'Vermelho', color: '#ef4444' },
  { value: 'bg-orange-500', label: 'Laranja', color: '#f97316' },
  { value: 'bg-yellow-500', label: 'Amarelo', color: '#eab308' },
  { value: 'bg-purple-500', label: 'Roxo', color: '#a855f7' },
  { value: 'bg-indigo-500', label: 'Índigo', color: '#6366f1' },
  { value: 'bg-blue-500', label: 'Azul', color: '#3b82f6' },
  { value: 'bg-green-500', label: 'Verde', color: '#22c55e' },
  { value: 'bg-pink-500', label: 'Rosa', color: '#ec4899' },
  { value: 'bg-gray-400', label: 'Cinza', color: '#9ca3af' },
  { value: 'bg-teal-500', label: 'Teal', color: '#14b8a6' },
]

export function CustosAtivosManager() {
  const [costs, setCosts] = React.useState<Cost[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingCost, setEditingCost] = React.useState<Cost | null>(null)
  const [logoFile, setLogoFile] = React.useState<File | null>(null)
  const [logoPreview, setLogoPreview] = React.useState<string>('')
  const [formData, setFormData] = React.useState({
    name: '',
    value: '',
    color: 'bg-red-500'
  })

  // Carregar custos do Supabase
  React.useEffect(() => {
    loadCosts()
  }, [])

  const loadCosts = async () => {
    setIsLoading(true)
    try {
      const data = await getCosts()
      setCosts(data)
    } catch (error) {
      console.error('Error loading costs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalValue = costs.reduce((sum, cost) => sum + cost.value, 0)

  const handleAddCost = async () => {
    if (!formData.name || !formData.value) return

    try {
      const newCost = await createCost({
        name: formData.name,
        value: parseFloat(formData.value),
        color: formData.color,
        logo_url: logoPreview || null
      })

      if (newCost) {
        await loadCosts() // Recarregar para recalcular percentuais
        resetForm()
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error('Error adding cost:', error)
    }
  }

  const handleEditCost = (cost: Cost) => {
    setEditingCost(cost)
    setFormData({
      name: cost.name,
      value: cost.value.toString(),
      color: cost.color
    })
    setLogoPreview(cost.logo_url || '')
  }

  const handleUpdateCost = async () => {
    if (!editingCost || !formData.name || !formData.value) return

    try {
      await updateCost(editingCost.id, {
        name: formData.name,
        value: parseFloat(formData.value),
        color: formData.color,
        logo_url: logoPreview || null
      })

      await loadCosts() // Recarregar para recalcular percentuais
      resetForm()
    } catch (error) {
      console.error('Error updating cost:', error)
    }
  }

  const handleDeleteCost = async (costId: string) => {
    try {
      await deleteCost(costId)
      await loadCosts() // Recarregar para recalcular percentuais
    } catch (error) {
      console.error('Error deleting cost:', error)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', value: '', color: 'bg-red-500' })
    setEditingCost(null)
    setLogoFile(null)
    setLogoPreview('')
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
          <h2 className="text-lg font-semibold">Gerenciar Custos</h2>
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
              Adicionar Custo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Custo</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo custo operacional
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Custo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Aluguel, Salários, Marketing"
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                resetForm()
              }}>
                Cancelar
              </Button>
              <Button onClick={handleAddCost}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de custos */}
      <div className="grid gap-4">
        {costs.map((cost) => (
          <Card key={cost.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${cost.color}`} />
                  <div>
                    <h3 className="font-medium">{cost.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cost.percentage}% do total
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-mono font-medium">
                      US$ {cost.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="w-16 h-1 bg-muted rounded-full mt-1">
                      <div
                        className={`h-full rounded-full ${cost.color}`}
                        style={{ width: `${Math.max(cost.percentage * 2, 2)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCost(cost)}
                        >
                          <IconPencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Editar Custo</DialogTitle>
                          <DialogDescription>
                            Modifique os dados do custo
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Nome do Custo</Label>
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
                          <Button variant="outline" onClick={() => setEditingCost(null)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleUpdateCost}>
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
                            Tem certeza que deseja excluir o custo "{cost.name}"? 
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCost(cost.id)}
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

      {costs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhum custo cadastrado. Clique em "Adicionar Custo" para começar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}