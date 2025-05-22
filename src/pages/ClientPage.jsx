import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ClientPage() {
  const [chairs, setChairs] = useState([])

  useEffect(() => {
    const loadChairs = async () => {
      const { data, error } = await supabase.from("chairs").select("*")
      if (!error) setChairs(data)
    }
    loadChairs()
  }, [])

  return (
    <div>
      <h1>Marcello Collection</h1>
      {chairs.map(chair => (
        <div key={chair.id}>
          <img src={`https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/chair-images/${chair.image_url}`} alt="" width="200" />
          <p>{chair.description}</p>
        </div>
      ))}
    </div>
  )
}
