import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ldvvpmgvmpniiazwaphm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdnZwbWd2bXBuaWlhendhcGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Mzg1NjUsImV4cCI6MjA2MzUxNDU2NX0.zSef0WyXmg7T6Ev9UVYIUHo8sMiqWicz60BVax99HOk'
)
