'use client'

import * as React from 'react'
import { IconX, IconEdit, IconSave, IconCancel } from '@tabler/icons-react'
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
import { Colaborador, HistoricoAlteracao, tiposContrato } from '@/types/colaborador'

interface ColaboradorProfileModalProps {
  colaborador: Colaborador | null
  isOpen: boolean
  onClose: () => void
  historico: HistoricoAlteracao[]
}

export function ColaboradorProfileModal({ 
  colaborador, 
  isOpen, 
  onClose, 
  historico 
}: ColaboradorProfileModalProps) {
  const [isEditing, setIsEditing] = React.useState(false)

  if (!colaborador) return null

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

  const valorLiquido = colaborador.salarioBase + colaborador.beneficios - colaborador.descontos

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{colaborador.nome}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <span>{getTipoContratoIcon(colaborador.tipoContrato)}</span>
                {colaborador.cargo} - {colaborador.departamento}
                <Badge variant="outline" className="ml-2">
                  <div className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(colaborador.status)}`} />
                  {colaborador.status}
                </Badge>
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={() => setIsEditing(false)}>
                    <IconSave className="w-4 h-4 mr-1" />
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    <IconCancel className="w-4 h-4 mr-1" />
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <IconEdit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="pessoais" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="financeiros">Dados Financeiros</TabsTrigger>
            <TabsTrigger value="pagamento">Dados de Pagamento</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="pessoais" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Informações Pessoais</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nome:</strong> {colaborador.nome}</div>
                    <div><strong>CPF/CNPJ:</strong> {colaborador.cpfCnpj}</div>
                    <div><strong>RG:</strong> {colaborador.rg}</div>
                    <div><strong>Data de Nascimento:</strong> {formatDate(colaborador.dataNascimento)}</div>
                    <div><strong>Estado Civil:</strong> {colaborador.estadoCivil}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Contato</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Telefone:</strong> {colaborador.telefone}</div>
                    <div><strong>E-mail Pessoal:</strong> {colaborador.email}</div>
                    <div><strong>E-mail Corporativo:</strong> {colaborador.emailCorporativo}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Endereço</h3>
                  <div className="text-sm">
                    <div>{colaborador.endereco.rua}, {colaborador.endereco.numero}</div>
                    <div>{colaborador.endereco.bairro}</div>
                    <div>{colaborador.endereco.cidade} - {colaborador.endereco.estado}</div>
                    <div>CEP: {colaborador.endereco.cep}</div>
                    <div>{colaborador.endereco.pais}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Dados Profissionais</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Cargo:</strong> {colaborador.cargo}</div>
                    <div><strong>Departamento:</strong> {colaborador.departamento}</div>
                    <div><strong>Tipo de Contrato:</strong> {getTipoContratoIcon(colaborador.tipoContrato)} {colaborador.tipoContrato}</div>
                    <div><strong>Data de Admissão:</strong> {formatDate(colaborador.dataAdmissao)}</div>
                    <div><strong>Matrícula:</strong> {colaborador.matricula}</div>
                    <div><strong>Supervisor:</strong> {colaborador.supervisor}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financeiros" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Remuneração</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Salário Base</div>
                    <div className="text-xl font-bold text-blue-600">
                      US$ {colaborador.salarioBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Benefícios</div>
                    <div className="text-lg font-semibold text-green-600">
                      + US$ {colaborador.beneficios.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Descontos</div>
                    <div className="text-lg font-semibold text-red-600">
                      - US$ {colaborador.descontos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Valor Líquido</h3>
                <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                  <div className="text-sm text-muted-foreground">Valor Final</div>
                  <div className="text-2xl font-bold text-primary">
                    US$ {valorLiquido.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Salário + Benefícios - Descontos
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pagamento" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Forma de Pagamento</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Método:</strong> {colaborador.formaPagamento}</div>
                  
                  {colaborador.chavePix && (
                    <div><strong>Chave PIX:</strong> {colaborador.chavePix}</div>
                  )}
                  
                  {colaborador.enderecoUsdt && (
                    <div><strong>Endereço USDT:</strong> {colaborador.enderecoUsdt}</div>
                  )}
                  
                  {colaborador.banco && (
                    <>
                      <div><strong>Banco:</strong> {colaborador.banco}</div>
                      <div><strong>Agência:</strong> {colaborador.agencia}</div>
                      <div><strong>Conta:</strong> {colaborador.conta}</div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Dados Completos</h3>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <div><strong>Beneficiário:</strong> {colaborador.nome}</div>
                  <div><strong>CPF/CNPJ:</strong> {colaborador.cpfCnpj}</div>
                  <div><strong>Forma:</strong> {colaborador.formaPagamento}</div>
                  {colaborador.chavePix && <div><strong>PIX:</strong> {colaborador.chavePix}</div>}
                  {colaborador.enderecoUsdt && <div><strong>USDT:</strong> {colaborador.enderecoUsdt}</div>}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Histórico de Alterações</h3>
              <div className="space-y-3">
                {historico.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{item.acao}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(item.data)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.detalhes}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Por: {item.usuario}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}