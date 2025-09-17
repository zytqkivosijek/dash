'use client'

import * as React from 'react'
import { IconEye, IconDownload, IconExternalLink, IconTrash, IconCopy, IconKey } from '@tabler/icons-react'
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
import { Documento, Acesso, tiposDocumento } from '@/types/documento'

interface DocumentosTableProps {
  items: (Documento | Acesso)[]
  onView: (item: Documento | Acesso) => void
  onDelete: (id: number) => void
}

export function DocumentosTable({ items, onView, onDelete }: DocumentosTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-500'
      case 'Arquivado': return 'bg-yellow-500'
      case 'Restrito': return 'bg-red-500'
      case 'Inativo': return 'bg-gray-500'
      case 'Expirado': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getTipoIcon = (tipo: string) => {
    const tipoInfo = tiposDocumento.find(t => t.value === tipo)
    return tipoInfo ? tipoInfo.icon : '📄'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aqui você poderia adicionar um toast de confirmação
  }

  const isDocumento = (item: Documento | Acesso): item is Documento => {
    return 'tipo' in item
  }

  const isAcesso = (item: Documento | Acesso): item is Acesso => {
    return !('tipo' in item)
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1200px]">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px]">Nome/Título</TableHead>
            <TableHead className="min-w-[120px]">Tipo/Categoria</TableHead>
            <TableHead className="min-w-[200px]">Descrição</TableHead>
            <TableHead className="min-w-[120px]">Responsável</TableHead>
            <TableHead className="min-w-[120px]">Data Modificação</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[100px]">Acessos</TableHead>
            <TableHead className="min-w-[150px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {isDocumento(item) ? getTipoIcon(item.tipo) : '🔐'}
                  </div>
                  <div>
                    <button
                      onClick={() => onView(item)}
                      className="font-medium text-primary hover:underline text-left"
                    >
                      {item.nome}
                    </button>
                    {isDocumento(item) && item.tamanho && (
                      <div className="text-xs text-muted-foreground">
                        {item.tamanho}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {isDocumento(item) && (
                    <Badge variant="outline" className="flex items-center gap-1 w-fit mb-1">
                      <span>{getTipoIcon(item.tipo)}</span>
                      {item.tipo}
                    </Badge>
                  )}
                  <div className="text-sm text-muted-foreground">{item.categoria}</div>
                </div>
              </TableCell>
              <TableCell className="max-w-xs">
                <div className="truncate" title={item.descricao}>
                  {item.descricao}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{item.responsavel}</TableCell>
              <TableCell>
                {isDocumento(item) 
                  ? formatDate(item.dataModificacao)
                  : formatDate(item.dataAtualizacao)
                }
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="flex items-center gap-1 w-fit">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                {isDocumento(item) && item.acessos ? (
                  <div className="text-center">
                    <div className="font-medium">{item.acessos}</div>
                    {item.ultimoAcesso && (
                      <div className="text-xs text-muted-foreground">
                        {formatDate(item.ultimoAcesso)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">-</div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(item)}
                    title="Visualizar"
                  >
                    <IconEye className="w-4 h-4" />
                  </Button>
                  
                  {isDocumento(item) && item.url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(item.url, '_blank')}
                      title="Abrir externamente"
                    >
                      <IconExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {isDocumento(item) && item.arquivo && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Baixar arquivo"
                    >
                      <IconDownload className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {isAcesso(item) && (item.senha || item.apiKey || item.token) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const credential = item.senha || item.apiKey || item.token || ''
                        copyToClipboard(credential)
                      }}
                      title="Copiar credencial"
                    >
                      <IconCopy className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" title="Excluir">
                        <IconTrash className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir "{item.nome}"? 
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(item.id)}
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
      
      {items.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum item encontrado.
        </div>
      )}
    </div>
  )
}