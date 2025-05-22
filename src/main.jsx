import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"

function App() {
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("chairs")
    if (saved) {
      setChairs(JSON.parse(saved))
    }
  }, [])

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
      <h1>Marcello Collection (Lokalna)</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <input
        type="text"
        placeholder="Opis krzesła"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <br />
      <button onClick={handleAdd} style={{ marginTop: "1rem" }}>
        Dodaj krzesło
      </button>

      <h2 style={{ marginTop: "2rem" }}>Krzesła:</h2>
      {chairs.map((chair, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <img src={chair.image} alt="" width="200" />
          <p>{chair.description}</p>
        </div>
      ))}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
