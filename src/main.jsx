import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import ClientPage from './pages/ClientPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<ClientPage />} />
    </Routes>
  </BrowserRouter>
)
