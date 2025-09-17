/*
  # Criar tabela de histórico de alterações

  1. New Tables
    - `historico_alteracoes`
      - `id` (uuid, primary key)
      - `colaborador_id` (uuid, referência ao colaborador)
      - `acao` (text, tipo de ação)
      - `detalhes` (text, detalhes da alteração)
      - `usuario_responsavel` (text, quem fez a alteração)
      - `created_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `historico_alteracoes` table
    - Add policy for authenticated users to manage their own history
*/

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