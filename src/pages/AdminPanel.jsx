import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function AdminPanel() {
  const [chairs, setChairs] = useState([])
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetchChairs()
  }, [])

  async function fetchChairs() {
    const { data, error } = await supabase.from("chairs").select("*")
    if (!error) setChairs(data)
  }

  async function handleAdd() {
    if (!image || !description) return alert("Wybierz zdjęcie i wpisz opis.")

    const filename = `${Date.now()}_${image.name}`
    const { error: uploadError } = await supabase.storage.from("chairimage").upload(filename, image)
    if (uploadError) return alert("Błąd zdjęcia: " + uploadError.message)

    const imageUrl = `https://ldvvpmgvmpniiazwaphm.supabase.co/storage/v1/object/public/chairimage/${filename}`
    const { error: insertError } = await supabase.from("chairs").insert({ image_url: imageUrl, description })
    if (insertError) return alert("Błąd bazy: " + insertError.message)

    setImage(null)
    setDescription("")
    fetchChairs()
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("chairs").delete().eq("id", id)
    if (!error) fetchChairs()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dodaj krzesło</h2>
      <input type="file" onChange={e => setImage(e.target.files[0])} /><br />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis" /><br />
      <button onClick={handleAdd}>Dodaj</button>

      <h3>Lista krzeseł</h3>
      {chairs.map(chair => (
        <div key={chair.id} style={{ marginBottom: '1rem' }}>
          <img src={chair.image_url} alt="" width="200" />
          <p>{chair.description}</p>
          <button onClick={() => handleDelete(chair.id)}>Usuń</button>
        </div>
      ))}
    </div>
  )
}
