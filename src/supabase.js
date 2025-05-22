import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://hwwgmveztxngpshceyoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d2dtdmV6dHhuZ3BzaGNleW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTY2NzEsImV4cCI6MjA2MzQzMjY3MX0.s1r31dIqcjD5IK_BhQmV71tlq5TWtA24Bd1-JreVNf4'
)
