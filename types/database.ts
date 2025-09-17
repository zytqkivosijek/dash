export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          name: string
          value: number
          percentage: number
          color: string
          logo_url: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          percentage?: number
          color?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          percentage?: number
          color?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      costs: {
        Row: {
          id: string
          name: string
          value: number
          percentage: number
          color: string
          logo_url: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          percentage?: number
          color?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          percentage?: number
          color?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      colaboradores: {
        Row: {
          id: string
          nome: string
          cpf_cnpj: string
          rg: string | null
          data_nascimento: string | null
          telefone: string
          email: string | null
          email_corporativo: string
          estado_civil: string | null
          endereco: any | null
          cargo: string
          departamento: string
          tipo_contrato: 'CLT' | 'PJ' | 'Freelancer' | 'Estágio'
          data_admissao: string
          data_desligamento: string | null
          matricula: string
          supervisor: string | null
          salario_base: number
          beneficios: number
          descontos: number
          forma_pagamento: string
          chave_pix: string | null
          endereco_usdt: string | null
          banco: string | null
          agencia: string | null
          conta: string | null
          foto_url: string | null
          status: 'Ativo' | 'Inativo' | 'Em experiência'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          nome: string
          cpf_cnpj: string
          rg?: string | null
          data_nascimento?: string | null
          telefone: string
          email?: string | null
          email_corporativo: string
          estado_civil?: string | null
          endereco?: any | null
          cargo: string
          departamento: string
          tipo_contrato: 'CLT' | 'PJ' | 'Freelancer' | 'Estágio'
          data_admissao: string
          data_desligamento?: string | null
          matricula: string
          supervisor?: string | null
          salario_base?: number
          beneficios?: number
          descontos?: number
          forma_pagamento: string
          chave_pix?: string | null
          endereco_usdt?: string | null
          banco?: string | null
          agencia?: string | null
          conta?: string | null
          foto_url?: string | null
          status?: 'Ativo' | 'Inativo' | 'Em experiência'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          nome?: string
          cpf_cnpj?: string
          rg?: string | null
          data_nascimento?: string | null
          telefone?: string
          email?: string | null
          email_corporativo?: string
          estado_civil?: string | null
          endereco?: any | null
          cargo?: string
          departamento?: string
          tipo_contrato?: 'CLT' | 'PJ' | 'Freelancer' | 'Estágio'
          data_admissao?: string
          data_desligamento?: string | null
          matricula?: string
          supervisor?: string | null
          salario_base?: number
          beneficios?: number
          descontos?: number
          forma_pagamento?: string
          chave_pix?: string | null
          endereco_usdt?: string | null
          banco?: string | null
          agencia?: string | null
          conta?: string | null
          foto_url?: string | null
          status?: 'Ativo' | 'Inativo' | 'Em experiência'
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      historico_alteracoes: {
        Row: {
          id: string
          colaborador_id: string
          acao: string
          detalhes: string
          usuario_responsavel: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          colaborador_id: string
          acao: string
          detalhes: string
          usuario_responsavel: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          colaborador_id?: string
          acao?: string
          detalhes?: string
          usuario_responsavel?: string
          created_at?: string
          user_id?: string
        }
      }
      registro_custos: {
        Row: {
          id: string
          data: string
          categoria: 'Marketing' | 'Operação' | 'Serviço' | 'Outro'
          descricao: string
          metodo_pagamento: string
          valor: number
          responsavel: string
          projeto: string | null
          conta_usada: 'Conta Simples' | 'Carteira' | 'Fisico'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          data: string
          categoria: 'Marketing' | 'Operação' | 'Serviço' | 'Outro'
          descricao: string
          metodo_pagamento: string
          valor: number
          responsavel: string
          projeto?: string | null
          conta_usada: 'Conta Simples' | 'Carteira' | 'Fisico'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          data?: string
          categoria?: 'Marketing' | 'Operação' | 'Serviço' | 'Outro'
          descricao?: string
          metodo_pagamento?: string
          valor?: number
          responsavel?: string
          projeto?: string | null
          conta_usada?: 'Conta Simples' | 'Carteira' | 'Fisico'
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      documentos: {
        Row: {
          id: string
          nome: string
          tipo: 'Documento' | 'Planilha'
          categoria: string
          descricao: string
          arquivo_url: string | null
          url_externa: string | null
          tamanho: string | null
          tags: string[]
          permissoes: any
          status: 'Ativo' | 'Arquivado' | 'Restrito'
          acessos: number
          ultimo_acesso: string | null
          responsavel: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          nome: string
          tipo: 'Documento' | 'Planilha'
          categoria: string
          descricao: string
          arquivo_url?: string | null
          url_externa?: string | null
          tamanho?: string | null
          tags?: string[]
          permissoes?: any
          status?: 'Ativo' | 'Arquivado' | 'Restrito'
          acessos?: number
          ultimo_acesso?: string | null
          responsavel: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          nome?: string
          tipo?: 'Documento' | 'Planilha'
          categoria?: string
          descricao?: string
          arquivo_url?: string | null
          url_externa?: string | null
          tamanho?: string | null
          tags?: string[]
          permissoes?: any
          status?: 'Ativo' | 'Arquivado' | 'Restrito'
          acessos?: number
          ultimo_acesso?: string | null
          responsavel?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      acessos: {
        Row: {
          id: string
          nome: string
          categoria: string
          url: string | null
          usuario: string | null
          senha: string | null
          api_key: string | null
          token: string | null
          descricao: string
          tags: string[]
          status: 'Ativo' | 'Inativo' | 'Expirado'
          responsavel: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          nome: string
          categoria: string
          url?: string | null
          usuario?: string | null
          senha?: string | null
          api_key?: string | null
          token?: string | null
          descricao: string
          tags?: string[]
          status?: 'Ativo' | 'Inativo' | 'Expirado'
          responsavel: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          nome?: string
          categoria?: string
          url?: string | null
          usuario?: string | null
          senha?: string | null
          api_key?: string | null
          token?: string | null
          descricao?: string
          tags?: string[]
          status?: 'Ativo' | 'Inativo' | 'Expirado'
          responsavel?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      logs_acesso: {
        Row: {
          id: string
          documento_id: string | null
          usuario: string
          acao: 'Visualizar' | 'Baixar' | 'Editar' | 'Excluir'
          ip_address: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          documento_id?: string | null
          usuario: string
          acao: 'Visualizar' | 'Baixar' | 'Editar' | 'Excluir'
          ip_address?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          documento_id?: string | null
          usuario?: string
          acao?: 'Visualizar' | 'Baixar' | 'Editar' | 'Excluir'
          ip_address?: string | null
          created_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}