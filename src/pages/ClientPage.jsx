import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ClientPage() {
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    supabase.from('chairs').select('*').then(({ data, error }) => {
      if (!error) setChairs(data)
    })
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Marcello Collection</h1>
      {chairs.map(chair => (
        <div key={chair.id} style={{ marginBottom: '1rem' }}>
          <img src={chair.image_url} alt="" width="200" />
          <p>{chair.description}</p>
        </div>
      ))}
    </div>
  )
}
