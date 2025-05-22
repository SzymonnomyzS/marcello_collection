import React, { useState } from 'react'
import AdminPanel from './AdminPanel'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    if (password === 'marcello123') {
      setIsLoggedIn(true)
    } else {
      alert('Błędne hasło')
    }
  }

  return isLoggedIn ? (
    <AdminPanel />
  ) : (
    <div style={{ padding: '2rem' }}>
      <h2>Logowanie administratora</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Hasło"
      />
      <br />
      <button onClick={handleLogin} style={{ marginTop: '1rem' }}>Zaloguj</button>
    </div>
  )
}
