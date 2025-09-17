/*
  # Criar tabela de acessos e credenciais

  1. New Tables
    - `acessos`
      - `id` (uuid, primary key)
      - `nome` (text, nome do acesso)
      - `categoria` (text, categoria do acesso)
      - `url` (text, URL do sistema)
      - `usuario` (text, nome de usuário)
      - `senha` (text, senha criptografada)
      - `api_key` (text, chave de API)
      - `token` (text, token de acesso)
      - `descricao` (text, descrição)
      - `tags` (text[], array de tags)
      - `status` (text, status do acesso)
      - `responsavel` (text, responsável)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `acessos` table
    - Add policy for authenticated users to manage their own access credentials
*/

CREATE TABLE IF NOT EXISTS acessos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  categoria text NOT NULL,
  url text,
  usuario text,
  senha text, -- Em produção, isso deveria ser criptografado
  api_key text,
  token text,
  descricao text NOT NULL,
  tags text[] DEFAULT '{}',
  status text NOT NULL CHECK (status IN ('Ativo', 'Inativo', 'Expirado')) DEFAULT 'Ativo',
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

CREATE TRIGGER update_acessos_updated_at
  BEFORE UPDATE ON acessos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();