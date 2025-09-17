/*
  # Criar tabela de logs de acesso

  1. New Tables
    - `logs_acesso`
      - `id` (uuid, primary key)
      - `documento_id` (uuid, referência ao documento)
      - `usuario` (text, nome do usuário)
      - `acao` (text, ação realizada)
      - `ip_address` (text, endereço IP)
      - `created_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `logs_acesso` table
    - Add policy for authenticated users to view their own logs
*/

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

CREATE POLICY "Users can view own logs_acesso"
  ON logs_acesso
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create logs_acesso"
  ON logs_acesso
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);