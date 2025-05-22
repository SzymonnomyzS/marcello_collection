import React, { useState } from 'react'
import { supabase } from '../supabase'

export default function AdminPage() {
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    if (!image) return alert("Wybierz plik")
    const filename = Date.now() + "_" + image.name
    const { error: uploadError } = await supabase.storage.from("chair-images").upload(filename, image)
    if (uploadError) return alert("Błąd przesyłania zdjęcia")

    const { error: insertError } = await supabase.from("chairs").insert([{ image_url: filename, description }])
    if (insertError) return alert("Błąd zapisywania danych")
    alert("Dodano!")
  }

  return (
    <div>
      <h1>Dodaj krzesło</h1>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis" />
      <button onClick={handleSubmit}>Dodaj</button>
    </div>
  )
}
