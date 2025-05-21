import { useEffect, useState } from 'react'

export default function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Marcello Collection</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
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
