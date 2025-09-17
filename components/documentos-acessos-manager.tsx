'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DocumentosFilters } from '@/components/documentos-filters'
import { DocumentosTable } from '@/components/documentos-table'
import { DocumentoViewModal } from '@/components/documento-view-modal'
import { DocumentoFormModal } from '@/components/documento-form-modal'
import { Documento, Acesso } from '@/types/documento'
import { documentosData, acessosData } from '@/lib/documentos-data'

export function DocumentosAcessosManager() {
  const [documentos, setDocumentos] = React.useState<Documento[]>(documentosData)
  const [acessos, setAcessos] = React.useState<Acesso[]>(acessosData)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [tipoFilter, setTipoFilter] = React.useState('all')
  const [categoriaFilter, setCategoriaFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [selectedItem, setSelectedItem] = React.useState<Documento | Acesso | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)

  // Combinar documentos e acessos para exibição
  const allItems: (Documento | Acesso)[] = [
    ...documentos,
    ...acessos
  ]

  // Filtrar itens
  const filteredItems = allItems.filter((item) => {
    const matchesSearch = 
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTipo = tipoFilter === 'all' || 
      ('tipo' in item ? item.tipo === tipoFilter : tipoFilter === 'Acesso')
    
    const matchesCategoria = categoriaFilter === 'all' || item.categoria === categoriaFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter

    return matchesSearch && matchesTipo && matchesCategoria && matchesStatus
  })

  // Calcular estatísticas
  const totalDocumentos = documentos.length
  const totalPlanilhas = documentos.filter(d => d.tipo === 'Planilha').length
  const totalAcessos = acessos.length
  const totalAtivos = allItems.filter(item => item.status === 'Ativo').length

  const handleViewItem = (item: Documento | Acesso) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const handleAddItem = (item: Omit<Documento, 'id'> | Omit<Acesso, 'id'>) => {
    if ('tipo' in item) {
      // É um documento
      const novoDocumento: Documento = {
        ...item,
        id: Math.max(...documentos.map(d => d.id), 0) + 1
      }
      setDocumentos([...documentos, novoDocumento])
    } else {
      // É um acesso
      const novoAcesso: Acesso = {
        ...item,
        id: Math.max(...acessos.map(a => a.id), 0) + 1
      }
      setAcessos([...acessos, novoAcesso])
    }
  }

  const handleDeleteItem = (id: number) => {
    setDocumentos(documentos.filter(d => d.id !== id))
    setAcessos(acessos.filter(a => a.id !== id))
  }

  const handleExport = (format: string) => {
    console.log(`Exportando em formato: ${format}`)
    // Implementar lógica de exportação
  }

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocumentos}</div>
            <Badge variant="outline" className="mt-1">
              <span className="mr-1">📄</span>
              Arquivos e links
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Planilhas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalPlanilhas}</div>
            <Badge variant="outline" className="mt-1">
              <span className="mr-1">📊</span>
              Dashboards e dados
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Acessos e Senhas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAcessos}</div>
            <Badge variant="outline" className="mt-1">
              <span className="mr-1">🔐</span>
              Credenciais seguras
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Itens Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalAtivos}</div>
            <Badge variant="outline" className="mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              Em uso
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Header com botão de adicionar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Documentos, Planilhas e Acessos</h2>
          <p className="text-sm text-muted-foreground">
            {filteredItems.length} de {allItems.length} itens
          </p>
        </div>
      </div>

      {/* Filtros */}
      <DocumentosFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tipoFilter={tipoFilter}
        setTipoFilter={setTipoFilter}
        categoriaFilter={categoriaFilter}
        setCategoriaFilter={setCategoriaFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onExport={handleExport}
        onAddNew={() => setIsAddModalOpen(true)}
      />

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Itens</CardTitle>
          <CardDescription>
            Documentos internos, planilhas operacionais e credenciais de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentosTable
            items={filteredItems}
            onView={handleViewItem}
            onDelete={handleDeleteItem}
          />
        </CardContent>
      </Card>

      {/* Modal de Visualização */}
      <DocumentoViewModal
        item={selectedItem}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedItem(null)
        }}
      />

      {/* Modal de Cadastro */}
      <DocumentoFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  )
}