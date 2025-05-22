import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ClientPage() {
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    const loadChairs = async () => {
      const { data } = await supabase.from("chairs").select("*")
      if (data) setChairs(data)
    }
    loadChairs()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Marcello Collection</h1>
      {chairs.map((chair) => (
        <div key={chair.id} style={{ marginBottom: '1rem' }}>
          <img
            src={`https://hwwgmveztxngpshceyoz.supabase.co/storage/v1/object/public/chair-images/${chair.image_url}`}
            alt=""
            width="200"
          />
          <p>{chair.description}</p>
        </div>
      ))}
    </div>
  )
}
