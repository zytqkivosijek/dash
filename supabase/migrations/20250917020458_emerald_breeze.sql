/*
  # Complete database schema for the application

  1. New Tables
    - `accounts` - User financial accounts with values and percentages
    - `costs` - Active costs/expenses tracking
    - `colaboradores` - Employee management system
    - `registro_custos` - Cost registration history
    - `documentos` - Document management
    - `acessos` - Access credentials management
    - `logs_acesso` - Access audit logs
    - `historico_alteracoes` - Change history tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Foreign key constraints to auth.users

  3. Features
    - Automatic timestamp updates
    - Percentage calculations
    - JSON fields for complex data
    - Array fields for tags
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric(15,2) NOT NULL DEFAULT 0,
  percentage numeric(5,2) NOT NULL DEFAULT 0,
  color text NOT NULL DEFAULT 'bg-blue-500',
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own accounts"
  ON accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Costs table
CREATE TABLE IF NOT EXISTS costs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric(15,2) NOT NULL DEFAULT 0,
  percentage numeric(5,2) NOT NULL DEFAULT 0,
  color text NOT NULL DEFAULT 'bg-red-500',
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE costs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own costs"
  ON costs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Colaboradores table
CREATE TABLE IF NOT EXISTS colaboradores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cpf_cnpj text NOT NULL,
  rg text,
  data_nascimento date,
  telefone text NOT NULL,
  email text,
  email_corporativo text NOT NULL,
  estado_civil text,
  endereco jsonb,
  cargo text NOT NULL,
  departamento text NOT NULL,
  tipo_contrato text NOT NULL CHECK (tipo_contrato IN ('CLT', 'PJ', 'Freelancer', 'Estágio')),
  data_admissao date NOT NULL,
  data_desligamento date,
  matricula text NOT NULL,
  supervisor text,
  salario_base numeric(15,2) DEFAULT 0,
  beneficios numeric(15,2) DEFAULT 0,
  descontos numeric(15,2) DEFAULT 0,
  forma_pagamento text NOT NULL,
  chave_pix text,
  endereco_usdt text,
  banco text,
  agencia text,
  conta text,
  foto_url text,
  status text NOT NULL DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo', 'Em experiência')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own colaboradores"
  ON colaboradores
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Historico alteracoes table
CREATE TABLE IF NOT EXISTS historico_alteracoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  colaborador_id uuid REFERENCES colaboradores(id) ON DELETE CASCADE,
  acao text NOT NULL,
  detalhes text NOT NULL,
  usuario_responsavel text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE historico_alteracoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own historico_alteracoes"
  ON historico_alteracoes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Registro custos table
CREATE TABLE IF NOT EXISTS registro_custos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data date NOT NULL,
  categoria text NOT NULL CHECK (categoria IN ('Marketing', 'Operação', 'Serviço', 'Outro')),
  descricao text NOT NULL,
  metodo_pagamento text NOT NULL,
  valor numeric(15,2) NOT NULL,
  responsavel text NOT NULL,
  projeto text,
  conta_usada text NOT NULL CHECK (conta_usada IN ('Conta Simples', 'Carteira', 'Fisico')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE registro_custos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own registro_custos"
  ON registro_custos
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Documentos table
CREATE TABLE IF NOT EXISTS documentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('Documento', 'Planilha')),
  categoria text NOT NULL,
  descricao text NOT NULL,
  arquivo_url text,
  url_externa text,
  tamanho text,
  tags text[] DEFAULT '{}',
  permissoes jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Arquivado', 'Restrito')),
  acessos integer DEFAULT 0,
  ultimo_acesso timestamptz,
  responsavel text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own documentos"
  ON documentos
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Acessos table
CREATE TABLE IF NOT EXISTS acessos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  categoria text NOT NULL,
  url text,
  usuario text,
  senha text,
  api_key text,
  token text,
  descricao text NOT NULL,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo', 'Expirado')),
  responsavel text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE acessos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own acessos"
  ON acessos
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Logs acesso table
CREATE TABLE IF NOT EXISTS logs_acesso (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  documento_id uuid REFERENCES documentos(id) ON DELETE CASCADE,
  usuario text NOT NULL,
  acao text NOT NULL CHECK (acao IN ('Visualizar', 'Baixar', 'Editar', 'Excluir')),
  ip_address text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE logs_acesso ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own logs_acesso"
  ON logs_acesso
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_costs_updated_at
  BEFORE UPDATE ON costs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_colaboradores_updated_at
  BEFORE UPDATE ON colaboradores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registro_custos_updated_at
  BEFORE UPDATE ON registro_custos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documentos_updated_at
  BEFORE UPDATE ON documentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_acessos_updated_at
  BEFORE UPDATE ON acessos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();