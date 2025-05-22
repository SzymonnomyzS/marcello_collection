import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ClientPage() {
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    const fetchChairs = async () => {
      const { data, error } = await supabase.from('chairs').select('*')
      if (!error && data) setChairs(data)
    }
    fetchChairs()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Marcello Collection</h1>
      {chairs.map((chair) => (
        <div key={chair.id} style={{ marginBottom: '1rem' }}>
          <img
            src={`https://ldvvpmgvmpniiazwaphm.supabase.co/storage/v1/object/public/chairimage/${chair.image_url}`}
            alt=""
            width="200"
          />
          <p>{chair.description}</p>
        </div>
      ))}
    </div>
  )
}
