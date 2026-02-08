import React from 'react'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/Login'

const App = () => {
  return (
    <div>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
