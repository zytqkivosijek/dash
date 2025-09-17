'use client'

import * as React from 'react'
import { IconUpload, IconKey, IconFileText } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Documento, Acesso, tiposDocumento, categoriasDocumento, categoriasAcesso, statusOptions } from '@/types/documento'

interface DocumentoFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (item: Omit<Documento, 'id'> | Omit<Acesso, 'id'>) => void
}

export function DocumentoFormModal({ isOpen, onClose, onSubmit }: DocumentoFormModalProps) {
  const [tipoSelecionado, setTipoSelecionado] = React.useState<'Documento' | 'Planilha' | 'Acesso'>('Documento')
  const [arquivo, setArquivo] = React.useState<File | null>(null)
  
  const [formData, setFormData] = React.useState({
    // Campos comuns
    nome: '',
    categoria: '',
    descricao: '',
    responsavel: '',
    tags: '',
    status: 'Ativo' as const,
    
    // Campos específicos de Documento/Planilha
    url: '',
    
    // Campos específicos de Acesso
    urlAcesso: '',
    usuario: '',
    senha: '',
    apiKey: '',
    token: '',
    
    // Permissões (apenas para documentos)
    permissaoVisualizar: [] as string[],
    permissaoEditar: [] as string[],
    permissaoExcluir: [] as string[]
  })

  const handleSubmit = () => {
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    if (tipoSelecionado === 'Acesso') {
      const acessoData: Omit<Acesso, 'id'> = {
        nome: formData.nome,
        categoria: formData.categoria,
        url: formData.urlAcesso || undefined,
        usuario: formData.usuario || undefined,
        senha: formData.senha || undefined,
        apiKey: formData.apiKey || undefined,
        token: formData.token || undefined,
        descricao: formData.descricao,
        tags: tagsArray,
        dataAtualizacao: new Date().toISOString().split('T')[0],
        responsavel: formData.responsavel,
        status: formData.status as 'Ativo' | 'Inativo' | 'Expirado'
      }
      onSubmit(acessoData)
    } else {
      const documentoData: Omit<Documento, 'id'> = {
        nome: formData.nome,
        tipo: tipoSelecionado,
        categoria: formData.categoria,
        descricao: formData.descricao,
        arquivo: arquivo?.name,
        url: formData.url || undefined,
        tamanho: arquivo ? `${(arquivo.size / 1024 / 1024).toFixed(1)} MB` : undefined,
        dataUpload: new Date().toISOString().split('T')[0],
        dataModificacao: new Date().toISOString().split('T')[0],
        responsavel: formData.responsavel,
        tags: tagsArray,
        permissoes: {
          visualizar: formData.permissaoVisualizar.length > 0 ? formData.permissaoVisualizar : ['Todos'],
          editar: formData.permissaoEditar.length > 0 ? formData.permissaoEditar : ['Admin'],
          excluir: formData.permissaoExcluir.length > 0 ? formData.permissaoExcluir : ['Admin']
        },
        status: formData.status as 'Ativo' | 'Arquivado' | 'Restrito',
        acessos: 0
      }
      onSubmit(documentoData)
    }
    
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      categoria: '',
      descricao: '',
      responsavel: '',
      tags: '',
      status: 'Ativo',
      url: '',
      urlAcesso: '',
      usuario: '',
      senha: '',
      apiKey: '',
      token: '',
      permissaoVisualizar: [],
      permissaoEditar: [],
      permissaoExcluir: []
    })
    setArquivo(null)
    setTipoSelecionado('Documento')
  }

  const handleArquivoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setArquivo(file)
    }
  }

  const grupos = ['Todos', 'Admin', 'Gerência', 'Financeiro', 'RH', 'Tecnologia', 'Marketing', 'Vendas']

  const handlePermissaoChange = (tipo: 'visualizar' | 'editar' | 'excluir', grupo: string, checked: boolean) => {
    const campo = `permissao${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` as keyof typeof formData
    const atual = formData[campo] as string[]
    
    if (checked) {
      setFormData({
        ...formData,
        [campo]: [...atual, grupo]
      })
    } else {
      setFormData({
        ...formData,
        [campo]: atual.filter(g => g !== grupo)
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm()
        onClose()
      }
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
          <DialogDescription>
            Adicione um documento, planilha ou acesso ao sistema
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basico" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basico">Informações Básicas</TabsTrigger>
            <TabsTrigger value="arquivo">Arquivo/Link</TabsTrigger>
            <TabsTrigger value="permissoes">Permissões</TabsTrigger>
          </TabsList>

          <TabsContent value="basico" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo *</Label>
                <Select value={tipoSelecionado} onValueChange={(value: any) => setTipoSelecionado(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
              </div>

              <div>
                <Label htmlFor="categoria">Categoria *</Label>
                <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {(tipoSelecionado === 'Acesso' ? categoriasAcesso : categoriasDocumento).map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="nome">Nome/Título *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome do documento, planilha ou acesso"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o conteúdo ou finalidade"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  placeholder="Nome do responsável"
                />
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Separe as tags por vírgula (ex: contrato, cliente, desenvolvimento)"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="arquivo" className="space-y-4">
            {tipoSelecionado === 'Acesso' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <IconKey className="w-5 h-5" />
                  <h3 className="font-semibold">Credenciais de Acesso</h3>
                </div>

                <div>
                  <Label htmlFor="urlAcesso">URL do Sistema</Label>
                  <Input
                    id="urlAcesso"
                    value={formData.urlAcesso}
                    onChange={(e) => setFormData({ ...formData, urlAcesso: e.target.value })}
                    placeholder="https://sistema.exemplo.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="usuario">Usuário/Login</Label>
                    <Input
                      id="usuario"
                      value={formData.usuario}
                      onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                      placeholder="nome.usuario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      type="password"
                      value={formData.senha}
                      onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="apiKey">Chave de API</Label>
                  <Input
                    id="apiKey"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    placeholder="sk_live_..."
                  />
                </div>

                <div>
                  <Label htmlFor="token">Token de Acesso</Label>
                  <Input
                    id="token"
                    value={formData.token}
                    onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                    placeholder="ghp_..."
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <IconFileText className="w-5 h-5" />
                  <h3 className="font-semibold">Arquivo ou Link</h3>
                </div>

                <div>
                  <Label htmlFor="arquivo-upload">Upload de Arquivo</Label>
                  <div className="mt-2">
                    <Label htmlFor="arquivo-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 p-4 border border-dashed rounded-md hover:bg-accent transition-colors">
                        <IconUpload className="w-5 h-5" />
                        <div>
                          <div className="font-medium">
                            {arquivo ? arquivo.name : 'Clique para fazer upload do arquivo'}
                          </div>
                          {arquivo && (
                            <div className="text-sm text-muted-foreground">
                              {(arquivo.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                          )}
                          {!arquivo && (
                            <div className="text-sm text-muted-foreground">
                              PDF, DOC, XLS, PPT ou outros formatos
                            </div>
                          )}
                        </div>
                      </div>
                    </Label>
                    <input
                      id="arquivo-upload"
                      type="file"
                      className="hidden"
                      onChange={handleArquivoUpload}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-sm text-muted-foreground">OU</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                <div>
                  <Label htmlFor="url">Link Externo</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://docs.google.com/..."
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Link para Google Drive, OneDrive, ou outro serviço
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="permissoes" className="space-y-4">
            {tipoSelecionado === 'Acesso' ? (
              <div className="text-center py-8 text-muted-foreground">
                <IconKey className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Acessos são controlados pelo responsável</p>
                <p className="text-sm">Apenas o responsável pode gerenciar as credenciais</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">👁️ Quem pode Visualizar</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {grupos.map((grupo) => (
                      <div key={grupo} className="flex items-center space-x-2">
                        <Checkbox
                          id={`visualizar-${grupo}`}
                          checked={formData.permissaoVisualizar.includes(grupo)}
                          onCheckedChange={(checked) => handlePermissaoChange('visualizar', grupo, !!checked)}
                        />
                        <Label htmlFor={`visualizar-${grupo}`} className="text-sm">
                          {grupo}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">✏️ Quem pode Editar</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {grupos.map((grupo) => (
                      <div key={grupo} className="flex items-center space-x-2">
                        <Checkbox
                          id={`editar-${grupo}`}
                          checked={formData.permissaoEditar.includes(grupo)}
                          onCheckedChange={(checked) => handlePermissaoChange('editar', grupo, !!checked)}
                        />
                        <Label htmlFor={`editar-${grupo}`} className="text-sm">
                          {grupo}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-red-600">🗑️ Quem pode Excluir</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {grupos.map((grupo) => (
                      <div key={grupo} className="flex items-center space-x-2">
                        <Checkbox
                          id={`excluir-${grupo}`}
                          checked={formData.permissaoExcluir.includes(grupo)}
                          onCheckedChange={(checked) => handlePermissaoChange('excluir', grupo, !!checked)}
                        />
                        <Label htmlFor={`excluir-${grupo}`} className="text-sm">
                          {grupo}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => {
            resetForm()
            onClose()
          }}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Adicionar {tipoSelecionado}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}