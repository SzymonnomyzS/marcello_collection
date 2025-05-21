import { useState } from 'react'

export default function Admin() {
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [products, setProducts] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const correctPassword = 'marcello123'  // <- Możesz zmienić na inne hasło

  const login = () => {
    if (password === correctPassword) {
      setAuthenticated(true)
    } else {
      alert('Błędne hasło!')
    }
  }

  const addProduct = () => {
    if (image && description) {
      const newProduct = { image, description }
      const updated = [...products, newProduct]
      setProducts(updated)
      setImage('')
      setDescription('')
      const blob = new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'products.json'
      a.click()
    }
  }

  if (!authenticated) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Logowanie do panelu administratora</h2>
        <input
          type="password"
          placeholder="Wpisz hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={login} style={{ width: '100%', padding: '0.5rem' }}>Zaloguj</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Panel administratora – dodaj krzesło</h2>
      <input
        placeholder="Link do zdjęcia"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <textarea
        placeholder="Opis krzesła"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={addProduct} style={{ padding: '0.5rem', width: '100%' }}>Pobierz aktualny plik JSON</button>
    </div>
  )
}
