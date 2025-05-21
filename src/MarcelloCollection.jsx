import { useState } from 'react'

export default function MarcelloCollection() {
  const [products, setProducts] = useState([])
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const addProduct = () => {
    if (image && description) {
      setProducts([...products, { image, description }])
      setImage('')
      setDescription('')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Marcello Collection</h1>

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Link do zdjęcia"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <textarea
          placeholder="Opis krzesła"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button onClick={addProduct} style={{ padding: '0.75rem', width: '100%' }}>
          Dodaj krzesło
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={product.image} alt="krzesło" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem' }}>
              <p>{product.description}</p>
              <button style={{ marginTop: '1rem', padding: '0.5rem', width: '100%' }}>Zamów</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
