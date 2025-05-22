import React, { useState } from 'react'
import { supabase } from '../supabase'

export default function AdminPanel() {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    if (!file || !description) {
      alert("Wybierz zdjęcie i wpisz opis.")
      return
    }

    const fileName = `${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage.from("chairimage").upload(fileName, file)
    if (uploadError) return alert("Błąd podczas przesyłania zdjęcia: " + uploadError.message)

    const { error: insertError } = await supabase.from("chairs").insert([{ image_url: fileName, description }])
    if (insertError) return alert("Błąd zapisu do bazy: " + insertError.message)

    alert("Krzesło dodane!")
    setDescription("")
    setFile(null)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dodaj krzesło</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br />
      <input
        type="text"
        value={description}
        placeholder="Opis"
        onChange={e => setDescription(e.target.value)}
        style={{ marginTop: '1rem' }}
      /><br />
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Dodaj</button>
    </div>
  )
}
