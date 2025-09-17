'use client'

import * as React from 'react'
import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ColaboradoresFilters } from '@/components/colaboradores-filters'
import { ColaboradoresTable } from '@/components/colaboradores-table'
import { ColaboradorProfileModal } from '@/components/colaborador-profile-modal'
import { ColaboradorFormModal } from '@/components/colaborador-form-modal'
import { Colaborador } from '@/types/colaborador'
import { colaboradoresData, historicoAlteracoes } from '@/lib/colaboradores-data'

export function ColaboradoresManager() {
  const [colaboradores, setColaboradores] = React.useState<Colaborador[]>(colaboradoresData)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [departamentoFilter, setDepartamentoFilter] = React.useState('all')
  const [contratoFilter, setContratoFilter] = React.useState('all')
  const [selectedColaborador, setSelectedColaborador] = React.useState<Colaborador | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)

  // Filtrar colaboradores
  const filteredColaboradores = colaboradores.filter((colaborador) => {
    const matchesSearch = 
      colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.cpfCnpj.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || colaborador.status === statusFilter
    const matchesDepartamento = departamentoFilter === 'all' || colaborador.departamento === departamentoFilter
    const matchesContrato = contratoFilter === 'all' || colaborador.tipoContrato === contratoFilter

    return matchesSearch && matchesStatus && matchesDepartamento && matchesContrato
  })

  // Calcular estatísticas
  const totalColaboradores = colaboradores.length
  const ativos = colaboradores.filter(c => c.status === 'Ativo').length
  const emExperiencia = colaboradores.filter(c => c.status === 'Em experiência').length
  const inativos = colaboradores.filter(c => c.status === 'Inativo').length

  const handleViewProfile = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador)
    setIsProfileModalOpen(true)
  }

  const handleAddColaborador = (novoColaborador: Omit<Colaborador, 'id'>) => {
    const colaboradorComId: Colaborador = {
      ...novoColaborador,
      id: Math.max(...colaboradores.map(c => c.id), 0) + 1
    }
    setColaboradores([...colaboradores, colaboradorComId])
  }

  const handleDeleteColaborador = (id: number) => {
    setColaboradores(colaboradores.filter(c => c.id !== id))
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
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalColaboradores}</div>
            <Badge variant="outline" className="mt-1">
              Todos os funcionários
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{ativos}</div>
            <Badge variant="outline" className="mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              Em atividade
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Experiência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{emExperiencia}</div>
            <Badge variant="outline" className="mt-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1" />
              Período probatório
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inativos}</div>
            <Badge variant="outline" className="mt-1">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
              Desligados
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Header com botão de adicionar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lista de Colaboradores</h2>
          <p className="text-sm text-muted-foreground">
            {filteredColaboradores.length} de {totalColaboradores} colaboradores
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <IconPlus className="w-4 h-4 mr-2" />
          Adicionar Colaborador
        </Button>
      </div>

      {/* Filtros */}
      <ColaboradoresFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        departamentoFilter={departamentoFilter}
        setDepartamentoFilter={setDepartamentoFilter}
        contratoFilter={contratoFilter}
        setContratoFilter={setContratoFilter}
        onExport={handleExport}
      />

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Colaboradores</CardTitle>
          <CardDescription>
            Lista completa de todos os colaboradores da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ColaboradoresTable
            colaboradores={filteredColaboradores}
            onViewProfile={handleViewProfile}
            onDelete={handleDeleteColaborador}
          />
        </CardContent>
      </Card>

      {/* Modal de Perfil */}
      <ColaboradorProfileModal
        colaborador={selectedColaborador}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false)
          setSelectedColaborador(null)
        }}
        historico={selectedColaborador ? historicoAlteracoes[selectedColaborador.id] || [] : []}
      />

      {/* Modal de Cadastro */}
      <ColaboradorFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddColaborador}
      />
    </div>
  )
}