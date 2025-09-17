/*
  # Criar tabela de colaboradores

  1. New Tables
    - `colaboradores`
      - `id` (uuid, primary key)
      - `nome` (text, nome completo)
      - `cpf_cnpj` (text, documento)
      - `rg` (text, documento de identidade)
      - `data_nascimento` (date)
      - `telefone` (text)
      - `email` (text, email pessoal)
      - `email_corporativo` (text, email da empresa)
      - `estado_civil` (text)
      - `endereco` (jsonb, endereço completo)
      - `cargo` (text)
      - `departamento` (text)
      - `tipo_contrato` (text)
      - `data_admissao` (date)
      - `data_desligamento` (date, opcional)
      - `matricula` (text, único)
      - `supervisor` (text)
      - `salario_base` (numeric)
      - `beneficios` (numeric)
      - `descontos` (numeric)
      - `forma_pagamento` (text)
      - `chave_pix` (text, opcional)
      - `endereco_usdt` (text, opcional)
      - `banco` (text, opcional)
      - `agencia` (text, opcional)
      - `conta` (text, opcional)
      - `foto_url` (text, opcional)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `colaboradores` table
    - Add policy for authenticated users to manage their own colaboradores
*/

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
  salario_base numeric(15,2) NOT NULL DEFAULT 0,
  beneficios numeric(15,2) NOT NULL DEFAULT 0,
  descontos numeric(15,2) NOT NULL DEFAULT 0,
  forma_pagamento text NOT NULL,
  chave_pix text,
  endereco_usdt text,
  banco text,
  agencia text,
  conta text,
  foto_url text,
  status text NOT NULL CHECK (status IN ('Ativo', 'Inativo', 'Em experiência')) DEFAULT 'Ativo',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE(matricula, user_id)
);

ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own colaboradores"
  ON colaboradores
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_colaboradores_updated_at
  BEFORE UPDATE ON colaboradores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();