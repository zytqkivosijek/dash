/*
  # Criar tabela de documentos

  1. New Tables
    - `documentos`
      - `id` (uuid, primary key)
      - `nome` (text, nome do documento)
      - `tipo` (text, tipo do documento)
      - `categoria` (text, categoria)
      - `descricao` (text, descrição)
      - `arquivo_url` (text, URL do arquivo)
      - `url_externa` (text, link externo)
      - `tamanho` (text, tamanho do arquivo)
      - `tags` (text[], array de tags)
      - `permissoes` (jsonb, permissões de acesso)
      - `status` (text, status do documento)
      - `acessos` (integer, contador de acessos)
      - `ultimo_acesso` (timestamp)
      - `responsavel` (text, responsável pelo documento)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `documentos` table
    - Add policy for authenticated users to manage their own documents
*/

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
  permissoes jsonb DEFAULT '{"visualizar": ["Todos"], "editar": ["Admin"], "excluir": ["Admin"]}',
  status text NOT NULL CHECK (status IN ('Ativo', 'Arquivado', 'Restrito')) DEFAULT 'Ativo',
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

CREATE TRIGGER update_documentos_updated_at
  BEFORE UPDATE ON documentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();