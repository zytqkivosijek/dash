'use client'

import * as React from 'react'
import { IconX, IconDownload, IconExternalLink, IconEye, IconCopy, IconKey } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Documento, Acesso, LogAcesso } from '@/types/documento'
import { logsAcesso } from '@/lib/documentos-data'

interface DocumentoViewModalProps {
  item: Documento | Acesso | null
  isOpen: boolean
  onClose: () => void
}

export function DocumentoViewModal({ item, isOpen, onClose }: DocumentoViewModalProps) {
  if (!item) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Toast de confirmação poderia ser adicionado aqui
  }

  const isDocumento = (item: Documento | Acesso): item is Documento => {
    return 'tipo' in item
  }

  const isAcesso = (item: Documento | Acesso): item is Acesso => {
    return !('tipo' in item)
  }

  const itemLogs = isDocumento(item) 
    ? logsAcesso.filter(log => log.documentoId === item.id)
    : []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">
                  {isDocumento(item) ? (item.tipo === 'Documento' ? '📄' : '📊') : '🔐'}
                </span>
                {item.nome}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Badge className={`${getStatusColor(item.status)} text-white`}>
                  {item.status}
                </Badge>
                <span>{item.categoria}</span>
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {isDocumento(item) && item.url && (
                <Button size="sm" variant="outline" onClick={() => window.open(item.url, '_blank')}>
                  <IconExternalLink className="w-4 h-4 mr-1" />
                  Abrir Externo
                </Button>
              )}
              {isDocumento(item) && item.arquivo && (
                <Button size="sm" variant="outline">
                  <IconDownload className="w-4 h-4 mr-1" />
                  Baixar
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="detalhes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="permissoes">Permissões</TabsTrigger>
            <TabsTrigger value="logs">Logs de Acesso</TabsTrigger>
          </TabsList>

          <TabsContent value="detalhes" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Informações Gerais</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nome:</strong> {item.nome}</div>
                    <div><strong>Categoria:</strong> {item.categoria}</div>
                    <div><strong>Responsável:</strong> {item.responsavel}</div>
                    <div><strong>Status:</strong> {item.status}</div>
                    {isDocumento(item) && (
                      <>
                        <div><strong>Tipo:</strong> {item.tipo}</div>
                        {item.tamanho && <div><strong>Tamanho:</strong> {item.tamanho}</div>}
                        <div><strong>Data Upload:</strong> {formatDate(item.dataUpload)}</div>
                        <div><strong>Última Modificação:</strong> {formatDate(item.dataModificacao)}</div>
                        {item.acessos && <div><strong>Total de Acessos:</strong> {item.acessos}</div>}
                      </>
                    )}
                    {isAcesso(item) && (
                      <div><strong>Última Atualização:</strong> {formatDate(item.dataAtualizacao)}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Descrição</h3>
                  <p className="text-sm text-muted-foreground">{item.descricao}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {isDocumento(item) && (
                  <div>
                    <h3 className="font-semibold mb-3">Arquivo/Link</h3>
                    <div className="space-y-2 text-sm">
                      {item.arquivo && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span>📎 {item.arquivo}</span>
                            <Button size="sm" variant="outline">
                              <IconDownload className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {item.url && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="truncate">🔗 {item.url}</span>
                            <Button size="sm" variant="outline" onClick={() => window.open(item.url, '_blank')}>
                              <IconExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isAcesso(item) && (
                  <div>
                    <h3 className="font-semibold mb-3">Credenciais</h3>
                    <div className="space-y-3">
                      {item.url && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">URL</div>
                          <div className="flex items-center justify-between">
                            <span className="truncate font-mono text-sm">{item.url}</span>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard(item.url!)}>
                              <IconCopy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {item.usuario && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Usuário</div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">{item.usuario}</span>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard(item.usuario!)}>
                              <IconCopy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {item.senha && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Senha</div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">{item.senha}</span>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard('senha-real-aqui')}>
                              <IconCopy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {item.apiKey && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">API Key</div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">{item.apiKey}</span>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard('api-key-real-aqui')}>
                              <IconCopy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {item.token && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Token</div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">{item.token}</span>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard('token-real-aqui')}>
                              <IconCopy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissoes" className="space-y-4">
            {isDocumento(item) && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">👁️ Visualizar</h3>
                  <div className="space-y-1">
                    {item.permissoes.visualizar.map((perm) => (
                      <Badge key={perm} variant="outline" className="block w-fit">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">✏️ Editar</h3>
                  <div className="space-y-1">
                    {item.permissoes.editar.map((perm) => (
                      <Badge key={perm} variant="outline" className="block w-fit">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-red-600">🗑️ Excluir</h3>
                  <div className="space-y-1">
                    {item.permissoes.excluir.map((perm) => (
                      <Badge key={perm} variant="outline" className="block w-fit">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {isAcesso(item) && (
              <div className="text-center py-8 text-muted-foreground">
                <IconKey className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Permissões de acesso são gerenciadas pelo responsável</p>
                <p className="text-sm">Responsável: <strong>{item.responsavel}</strong></p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Histórico de Acessos</h3>
              <div className="space-y-3">
                {itemLogs.map((log) => (
                  <div key={log.id} className="flex gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{log.acao}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(log.data)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Por: {log.usuario}
                      </div>
                      {log.ip && (
                        <div className="text-xs text-muted-foreground mt-1">
                          IP: {log.ip}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {itemLogs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <IconEye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum log de acesso registrado</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}