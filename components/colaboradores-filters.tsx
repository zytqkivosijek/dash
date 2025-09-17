'use client'

import * as React from 'react'
import { IconSearch, IconFilter, IconDownload } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { statusOptions, departamentos, tiposContrato } from '@/types/colaborador'

interface ColaboradoresFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  departamentoFilter: string
  setDepartamentoFilter: (departamento: string) => void
  contratoFilter: string
  setContratoFilter: (contrato: string) => void
  onExport: (format: string) => void
}

export function ColaboradoresFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departamentoFilter,
  setDepartamentoFilter,
  contratoFilter,
  setContratoFilter,
  onExport
}: ColaboradoresFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-2">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nome, CPF/CNPJ ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
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

        <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {departamentos.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={contratoFilter} onValueChange={setContratoFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Contrato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {tiposContrato.map((tipo) => (
              <SelectItem key={tipo.value} value={tipo.value}>
                <div className="flex items-center gap-2">
                  <span>{tipo.icon}</span>
                  {tipo.label}
                </div>
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
      </div>
    </div>
  )
}