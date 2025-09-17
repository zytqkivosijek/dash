'use client'

import * as React from 'react'
import { IconUpload } from '@tabler/icons-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Colaborador, tiposContrato, statusOptions, departamentos, formasPagamento } from '@/types/colaborador'

interface ColaboradorFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (colaborador: Omit<Colaborador, 'id'>) => void
}

export function ColaboradorFormModal({ isOpen, onClose, onSubmit }: ColaboradorFormModalProps) {
  const [fotoFile, setFotoFile] = React.useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = React.useState<string>('')

  const [formData, setFormData] = React.useState({
    // Dados Pessoais
    nome: '',
    cpfCnpj: '',
    rg: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    emailCorporativo: '',
    estadoCivil: '',
    // Endereço
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: 'Brasil',
    // Dados Profissionais
    cargo: '',
    departamento: 'Tecnologia' as const,
    tipoContrato: 'CLT' as const,
    dataAdmissao: '',
    matricula: '',
    supervisor: '',
    // Dados Financeiros
    salarioBase: '',
    beneficios: '',
    descontos: '',
    // Dados de Pagamento
    formaPagamento: 'PIX',
    chavePix: '',
    enderecoUsdt: '',
    banco: '',
    agencia: '',
    conta: '',
    status: 'Ativo' as const
  })

  const handleSubmit = () => {
    const colaboradorData: Omit<Colaborador, 'id'> = {
      nome: formData.nome,
      cpfCnpj: formData.cpfCnpj,
      rg: formData.rg,
      dataNascimento: formData.dataNascimento,
      telefone: formData.telefone,
      email: formData.email,
      emailCorporativo: formData.emailCorporativo,
      estadoCivil: formData.estadoCivil,
      endereco: {
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        pais: formData.pais
      },
      cargo: formData.cargo,
      departamento: formData.departamento,
      tipoContrato: formData.tipoContrato,
      dataAdmissao: formData.dataAdmissao,
      matricula: formData.matricula,
      supervisor: formData.supervisor,
      salarioBase: parseFloat(formData.salarioBase) || 0,
      beneficios: parseFloat(formData.beneficios) || 0,
      descontos: parseFloat(formData.descontos) || 0,
      formaPagamento: formData.formaPagamento,
      chavePix: formData.chavePix || undefined,
      enderecoUsdt: formData.enderecoUsdt || undefined,
      banco: formData.banco || undefined,
      agencia: formData.agencia || undefined,
      conta: formData.conta || undefined,
      status: formData.status
    }

    onSubmit(colaboradorData)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      cpfCnpj: '',
      rg: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      emailCorporativo: '',
      estadoCivil: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: 'Brasil',
      cargo: '',
      departamento: 'Tecnologia',
      tipoContrato: 'CLT',
      dataAdmissao: '',
      matricula: '',
      supervisor: '',
      salarioBase: '',
      beneficios: '',
      descontos: '',
      formaPagamento: 'PIX',
      chavePix: '',
      enderecoUsdt: '',
      banco: '',
      agencia: '',
      conta: '',
      status: 'Ativo'
    })
    setFotoFile(null)
    setFotoPreview('')
  }

  const handleFotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
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
          <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo colaborador
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="pessoais" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="profissionais">Dados Profissionais</TabsTrigger>
            <TabsTrigger value="financeiros">Dados Financeiros</TabsTrigger>
            <TabsTrigger value="pagamento">Dados de Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="pessoais" className="space-y-4">
            <div className="flex items-center gap-6 p-4 border rounded-lg bg-muted/20">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                {fotoPreview ? (
                  <img
                    src={fotoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-lg">
                    {formData.nome ? formData.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="foto-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 p-3 border border-dashed rounded-md hover:bg-accent transition-colors">
                    <IconUpload className="w-4 h-4" />
                    <span className="text-sm">
                      {fotoPreview ? 'Alterar foto do colaborador' : 'Fazer upload da foto do colaborador'}
                    </span>
                  </div>
                </Label>
                <input
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFotoUpload}
                />
                {fotoPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setFotoFile(null)
                      setFotoPreview('')
                    }}
                  >
                    Remover foto
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome completo do colaborador"
                />
              </div>
              <div>
                <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                <Input
                  id="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor="rg">RG/CNH/Passaporte</Label>
                <Input
                  id="rg"
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                  placeholder="00.000.000-0"
                />
              </div>
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail Pessoal</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="emailCorporativo">E-mail Corporativo *</Label>
                <Input
                  id="emailCorporativo"
                  type="email"
                  value={formData.emailCorporativo}
                  onChange={(e) => setFormData({ ...formData, emailCorporativo: e.target.value })}
                  placeholder="nome@empresa.com"
                />
              </div>
              <div>
                <Label htmlFor="estadoCivil">Estado Civil</Label>
                <Select value={formData.estadoCivil} onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="Casado">Casado(a)</SelectItem>
                    <SelectItem value="Divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="Viúvo">Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Endereço Completo</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Input
                    value={formData.rua}
                    onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                    placeholder="Rua, Avenida..."
                  />
                </div>
                <div>
                  <Input
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    placeholder="Número"
                  />
                </div>
                <div>
                  <Input
                    value={formData.bairro}
                    onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                    placeholder="Bairro"
                  />
                </div>
                <div>
                  <Input
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <Input
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    placeholder="Estado"
                  />
                </div>
                <div>
                  <Input
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    placeholder="CEP"
                  />
                </div>
                <div>
                  <Input
                    value={formData.pais}
                    onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                    placeholder="País"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profissionais" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cargo">Cargo/Função *</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  placeholder="Ex: Desenvolvedor Senior"
                />
              </div>
              <div>
                <Label htmlFor="departamento">Departamento *</Label>
                <Select value={formData.departamento} onValueChange={(value: any) => setFormData({ ...formData, departamento: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tipoContrato">Tipo de Contrato *</Label>
                <Select value={formData.tipoContrato} onValueChange={(value: any) => setFormData({ ...formData, tipoContrato: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
              <div>
                <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
                <Input
                  id="dataAdmissao"
                  type="date"
                  value={formData.dataAdmissao}
                  onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="matricula">Matrícula *</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  placeholder="EMP001"
                />
              </div>
              <div>
                <Label htmlFor="supervisor">Supervisor/Gestor</Label>
                <Input
                  id="supervisor"
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  placeholder="Nome do supervisor"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financeiros" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salarioBase">Salário Base (US$) *</Label>
                <Input
                  id="salarioBase"
                  type="number"
                  step="0.01"
                  value={formData.salarioBase}
                  onChange={(e) => setFormData({ ...formData, salarioBase: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="beneficios">Benefícios (US$)</Label>
                <Input
                  id="beneficios"
                  type="number"
                  step="0.01"
                  value={formData.beneficios}
                  onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="descontos">Descontos (US$)</Label>
                <Input
                  id="descontos"
                  type="number"
                  step="0.01"
                  value={formData.descontos}
                  onChange={(e) => setFormData({ ...formData, descontos: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pagamento" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
                <Select value={formData.formaPagamento} onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formasPagamento.map((forma) => (
                      <SelectItem key={forma} value={forma}>
                        {forma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              {formData.formaPagamento === 'PIX' && (
                <div className="col-span-2">
                  <Label htmlFor="chavePix">Chave PIX</Label>
                  <Input
                    id="chavePix"
                    value={formData.chavePix}
                    onChange={(e) => setFormData({ ...formData, chavePix: e.target.value })}
                    placeholder="email@exemplo.com ou (11) 99999-9999"
                  />
                </div>
              )}

              {formData.formaPagamento === 'USDT' && (
                <div className="col-span-2">
                  <Label htmlFor="enderecoUsdt">Endereço USDT</Label>
                  <Input
                    id="enderecoUsdt"
                    value={formData.enderecoUsdt}
                    onChange={(e) => setFormData({ ...formData, enderecoUsdt: e.target.value })}
                    placeholder="TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH"
                  />
                </div>
              )}

              {formData.formaPagamento === 'Transferência Bancária' && (
                <>
                  <div>
                    <Label htmlFor="banco">Banco</Label>
                    <Input
                      id="banco"
                      value={formData.banco}
                      onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
                      placeholder="Nome do banco"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agencia">Agência</Label>
                    <Input
                      id="agencia"
                      value={formData.agencia}
                      onChange={(e) => setFormData({ ...formData, agencia: e.target.value })}
                      placeholder="0000-0"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="conta">Conta</Label>
                    <Input
                      id="conta"
                      value={formData.conta}
                      onChange={(e) => setFormData({ ...formData, conta: e.target.value })}
                      placeholder="00000-0"
                    />
                  </div>
                </>
              )}
            </div>
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
            Adicionar Colaborador
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}