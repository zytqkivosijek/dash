'use client'

import * as React from 'react'
import { IconSearch, IconFilter, IconDownload, IconUpload } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { tiposDocumento, categoriasDocumento, statusOptions } from '@/types/documento'

interface DocumentosFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  tipoFilter: string
  setTipoFilter: (tipo: string) => void
  categoriaFilter: string
  setCategoriaFilter: (categoria: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  onExport: (format: string) => void
  onAddNew: () => void
}

export function DocumentosFilters({
  searchTerm,
  setSearchTerm,
  tipoFilter,
  setTipoFilter,
  categoriaFilter,
  setCategoriaFilter,
  statusFilter,
  setStatusFilter,
  onExport,
  onAddNew
}: DocumentosFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-2">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nome, descrição ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={tipoFilter} onValueChange={setTipoFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {tiposDocumento.map((tipo) => (
              <SelectItem key={tipo.value} value={tipo.value}>
                <div className="flex items-center gap-2">
                  <span>{tipo.icon}</span>
                  {tipo.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categoriasDocumento.map((categoria) => (
              <SelectItem key={categoria} value={categoria}>
                {categoria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Select onValueChange={onExport}>
          <SelectTrigger asChild>
            <Button variant="outline">
              <IconDownload className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="csv">Exportar CSV</SelectItem>
            <SelectItem value="excel">Exportar Excel</SelectItem>
            <SelectItem value="pdf">Exportar PDF</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onAddNew}>
          <IconUpload className="w-4 h-4 mr-2" />
          Adicionar Novo
        </Button>
      </div>
    </div>
  )
}