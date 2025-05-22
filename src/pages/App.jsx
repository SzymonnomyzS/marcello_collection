import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://hwwgmveztxngpshceyoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d2dtdmV6dHhuZ3BzaGNleW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTY2NzEsImV4cCI6MjA2MzQzMjY3MX0.s1r31dIqcjD5IK_BhQmV71tlq5TWtA24Bd1-JreVNf4'
)

export default function App() {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !description) {
      setStatus('Podaj opis i wybierz plik.')
      return
    }

    const fileName = Date.now() + '_' + file.name
    const { error: uploadError } = await supabase.storage
      .from('chair-images')
      .upload(fileName, file)

    if (uploadError) {
      setStatus('Błąd uploadu: ' + uploadError.message)
      return
    }

    const { data } = supabase.storage.from('chair-images').getPublicUrl(fileName)
    const imageUrl = data.publicUrl

    const { error: insertError } = await supabase.from('chairs').insert([{ image_url: imageUrl, description }])

    if (insertError) {
      setStatus('Błąd zapisu: ' + insertError.message)
    } else {
      setStatus('Dodano!')
      setDescription('')
      setFile(null)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>Dodaj krzesło</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <textarea
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', marginTop: '1rem' }}
          required
        />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Dodaj
        </button>
      </form>
      <p>{status}</p>
    </div>
  )
}
