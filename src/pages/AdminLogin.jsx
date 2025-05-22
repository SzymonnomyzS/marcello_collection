import React, { useState } from 'react'
import AdminPanel from './AdminPanel'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const correctPassword = 'marcello123'

  const handleLogin = () => {
    if (password === correctPassword) {
      setLoggedIn(true)
    } else {
      alert('Złe hasło')
    }
  }

  return loggedIn ? (
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
