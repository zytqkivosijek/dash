/*
  # Criar tabela de registro de custos

  1. New Tables
    - `registro_custos`
      - `id` (uuid, primary key)
      - `data` (date, data do gasto)
      - `categoria` (text, categoria do custo)
      - `descricao` (text, descrição detalhada)
      - `metodo_pagamento` (text, forma de pagamento)
      - `valor` (numeric, valor em USD)
      - `responsavel` (text, quem fez o gasto)
      - `projeto` (text, projeto relacionado)
      - `conta_usada` (text, conta que foi debitada)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `registro_custos` table
    - Add policy for authenticated users to manage their own records
*/

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

CREATE TRIGGER update_registro_custos_updated_at
  BEFORE UPDATE ON registro_custos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();