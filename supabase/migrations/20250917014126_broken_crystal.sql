/*
  # Criar tabela de custos ativos

  1. New Tables
    - `costs`
      - `id` (uuid, primary key)
      - `name` (text, nome do custo)
      - `value` (numeric, valor em USD)
      - `percentage` (numeric, percentual do total)
      - `color` (text, classe CSS da cor)
      - `logo_url` (text, URL do logo opcional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, referência ao usuário)

  2. Security
    - Enable RLS on `costs` table
    - Add policy for authenticated users to manage their own costs
*/

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

CREATE TRIGGER update_costs_updated_at
  BEFORE UPDATE ON costs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();