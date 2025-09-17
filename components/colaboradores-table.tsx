'use client'

import * as React from 'react'
import { IconEye, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Colaborador, tiposContrato } from '@/types/colaborador'

interface ColaboradoresTableProps {
  colaboradores: Colaborador[]
  onViewProfile: (colaborador: Colaborador) => void
  onDelete: (id: number) => void
}

export function ColaboradoresTable({ colaboradores, onViewProfile, onDelete }: ColaboradoresTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-500'
      case 'Inativo': return 'bg-red-500'
      case 'Em experiência': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getTipoContratoIcon = (tipo: string) => {
    const tipoInfo = tiposContrato.find(t => t.value === tipo)
    return tipoInfo ? tipoInfo.icon : '📄'
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1200px]">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Nome do Colaborador</TableHead>
            <TableHead className="min-w-[180px]">Cargo/Departamento</TableHead>
            <TableHead className="min-w-[140px]">Tipo de Contrato</TableHead>
            <TableHead className="min-w-[120px]">Data de Admissão</TableHead>
            <TableHead className="min-w-[120px]">Status</TableHead>
            <TableHead className="min-w-[120px]">Salário Base</TableHead>
            <TableHead className="min-w-[140px]">Telefone</TableHead>
            <TableHead className="min-w-[200px]">E-mail</TableHead>
            <TableHead className="min-w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colaboradores.map((colaborador) => (
            <TableRow key={colaborador.id}>
              <TableCell>
                <button
                  onClick={() => onViewProfile(colaborador)}
                  className="font-medium text-primary hover:underline text-left"
                >
                  {colaborador.nome}
                </button>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{colaborador.cargo}</div>
                  <div className="text-sm text-muted-foreground">{colaborador.departamento}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="flex items-center gap-1 w-fit">
                  <span>{getTipoContratoIcon(colaborador.tipoContrato)}</span>
                  {colaborador.tipoContrato}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(colaborador.dataAdmissao)}</TableCell>
              <TableCell>
                <Badge variant="outline" className="flex items-center gap-1 w-fit">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(colaborador.status)}`} />
                  {colaborador.status}
                </Badge>
              </TableCell>
              <TableCell className="font-mono">
                US$ {colaborador.salarioBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell>{colaborador.telefone}</TableCell>
              <TableCell>
                <div>
                  <div className="text-sm">{colaborador.emailCorporativo}</div>
                  <div className="text-xs text-muted-foreground">{colaborador.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewProfile(colaborador)}
                  >
                    <IconEye className="w-4 h-4" />
                  </Button>
                  
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
                          Tem certeza que deseja excluir o colaborador "{colaborador.nome}"? 
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(colaborador.id)}
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
      
      {colaboradores.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum colaborador encontrado.
        </div>
      )}
    </div>
  )
}