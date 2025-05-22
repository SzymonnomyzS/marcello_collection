import React, { useState } from 'react'
import { supabase } from '../supabase'

export default function AdminPanel() {
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    if (!image || !description) return alert("Uzupełnij wszystko")

    const filename = Date.now() + "_" + image.name
    const { error: uploadError } = await supabase.storage.from("chair-images").upload(filename, image)
    if (uploadError) return alert("Błąd przesyłania zdjęcia")

    const { error: insertError } = await supabase.from("chairs").insert([{ image_url: filename, description }])
    if (insertError) return alert("Błąd zapisu do bazy")

    alert("Dodano!")
    setDescription("")
    setImage(null)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dodaj krzesło</h2>
      <input type="file" onChange={e => setImage(e.target.files[0])} /><br />
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
