import React, { useEffect, useState } from 'react'

export default function AdminPanel() {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("chairs")
    if (saved) setChairs(JSON.parse(saved))
  }, [])

  const saveChairs = (newChairs) => {
    setChairs(newChairs)
    localStorage.setItem("chairs", JSON.stringify(newChairs))
  }

  const handleAdd = () => {
    if (!file || !description) {
      alert("Wybierz zdjęcie i wpisz opis.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const newChair = { image: reader.result, description }
      const updated = [...chairs, newChair]
      saveChairs(updated)
      setDescription("")
      setFile(null)
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = (index) => {
    const updated = chairs.filter((_, i) => i !== index)
    saveChairs(updated)
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

      <h3 style={{ marginTop: "2rem" }}>Dodane krzesła</h3>
      {chairs.map((chair, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <img src={chair.image} alt="" width="200" />
          <p>{chair.description}</p>
          <button onClick={() => handleDelete(index)}>Usuń</button>
        </div>
      ))}
    </div>
  )
}
