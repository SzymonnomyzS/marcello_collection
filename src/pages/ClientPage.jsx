import React, { useEffect, useState } from 'react'

export default function ClientPage() {
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("chairs")
    if (saved) setChairs(JSON.parse(saved))
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Marcello Collection</h1>
      {chairs.map((chair, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <img src={chair.image} alt="" width="200" />
          <p>{chair.description}</p>
        </div>
      ))}
    </div>
  )
}
