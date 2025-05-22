import React, { useState } from 'react'

export default function AdminPanel() {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const [chairs, setChairs] = useState(() => {
    const saved = localStorage.getItem("chairs")
    return saved ? JSON.parse(saved) : []
  })

  const handleAdd = () => {
    if (!file || !description) {
      alert("Wybierz zdjęcie i wpisz opis.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const newChair = { image: reader.result, description }
      const updated = [...chairs, newChair]
      setChairs(updated)
      localStorage.setItem("chairs", JSON.stringify(updated))
      setDescription("")
      setFile(null)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dodaj krzesło</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <input
        type="text"
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <br />
      <button onClick={handleAdd} style={{ marginTop: "1rem" }}>
        Dodaj
      </button>
    </div>
  )
}
