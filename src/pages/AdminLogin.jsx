import React, { useState } from 'react'
import AdminPanel from './AdminPanel'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const correctPassword = 'marcello123'

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsLoggedIn(true)
    } else {
      alert('Złe hasło')
    }
  }

  return isLoggedIn ? (
    <AdminPanel />
  ) : (
    <div style={{ padding: '2rem' }}>
      <h2>Logowanie administratora</h2>
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Zaloguj</button>
    </div>
  )
}
