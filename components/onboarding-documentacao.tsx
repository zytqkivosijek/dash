'use client'

import * as React from 'react'
import { IconUpload, IconCheck, IconX, IconFile, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DocumentoUpload } from '@/types/onboarding'

interface OnboardingDocumentacaoProps {
  onComplete: () => void
}

const documentosObrigatorios = [
  { tipo: 'RG' as const, nome: 'RG ou CNH', descricao: 'Documento de identidade com foto' },
  { tipo: 'CPF' as const, nome: 'CPF', descricao: 'Cadastro de Pessoa Física' },
  { tipo: 'Comprovante Residência' as const, nome: 'Comprovante de Residência', descricao: 'Conta de luz, água ou telefone (últimos 3 meses)' },
  { tipo: 'Dados Bancários' as const, nome: 'Dados Bancários', descricao: 'Comprovante bancário ou chave PIX' }
]

export function OnboardingDocumentacao({ onComplete }: OnboardingDocumentacaoProps) {
  const [documentos, setDocumentos] = React.useState<DocumentoUpload[]>(
    documentosObrigatorios.map((doc, index) => ({
      id: `doc-${index}`,
      nome: doc.nome,
      tipo: doc.tipo,
      arquivo: null,
      status: 'pending'
    }))
  )
  const [observacoes, setObservacoes] = React.useState('')

  const handleFileUpload = (documentoId: string, file: File) => {
    setDocumentos(docs => 
      docs.map(doc => 
        doc.id === documentoId 
          ? { ...doc, arquivo: file, status: 'uploaded' as const }
          : doc
      )
    )
  }

  const handleRemoveFile = (documentoId: string) => {
    setDocumentos(docs => 
      docs.map(doc => 
        doc.id === documentoId 
          ? { ...doc, arquivo: null, status: 'pending' as const }
          : doc
      )
    )
  }

  const allDocumentsUploaded = documentos.every(doc => doc.arquivo !== null)

  React.useEffect(() => {
    if (allDocumentsUploaded) {
      onComplete()
    }
  }, [allDocumentsUploaded, onComplete])

  const getStatusColor = (status: DocumentoUpload['status']) => {
    switch (status) {
      case 'uploaded': return 'bg-green-500'
      case 'approved': return 'bg-blue-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: DocumentoUpload['status']) => {
    switch (status) {
      case 'uploaded': return 'Enviado'
      case 'approved': return 'Aprovado'
      case 'rejected': return 'Rejeitado'
      default: return 'Pendente'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">📄 Documentação Necessária</CardTitle>
          <p className="text-muted-foreground">
            Faça o upload dos documentos obrigatórios para prosseguir com o onboarding
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="text-center">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {documentos.filter(d => d.arquivo).length} de {documentos.length} documentos enviados
            </Badge>
          </div>

          {/* Documents grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentos.map((documento, index) => {
              const docInfo = documentosObrigatorios[index]
              
              return (
                <Card key={documento.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{documento.nome}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(documento.status)} text-white`}
                      >
                        {getStatusText(documento.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {docInfo.descricao}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {documento.arquivo ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <IconFile className="w-5 h-5 text-green-600" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{documento.arquivo.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {(documento.arquivo.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(documento.id)}
                          >
                            <IconTrash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Label htmlFor={`upload-${documento.id}`} className="cursor-pointer">
                        <div className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-lg hover:bg-accent transition-colors">
                          <IconUpload className="w-8 h-8 text-muted-foreground" />
                          <div className="text-center">
                            <div className="font-medium">Clique para fazer upload</div>
                            <div className="text-sm text-muted-foreground">
                              PDF, JPG, PNG (máx. 10MB)
                            </div>
                          </div>
                        </div>
                        <input
                          id={`upload-${documento.id}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(documento.id, file)
                            }
                          }}
                        />
                      </Label>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Alguma informação adicional sobre os documentos..."
              rows={3}
            />
          </div>

          {/* Status message */}
          {allDocumentsUploaded ? (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <IconCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-400">
                Todos os documentos foram enviados com sucesso!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                Você pode prosseguir para a próxima etapa
              </p>
            </div>
          ) : (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-700 dark:text-blue-400">
                Envie todos os documentos obrigatórios para continuar
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                Faltam {documentos.filter(d => !d.arquivo).length} documentos
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}