import { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'
import axios from 'axios';
import Router from './components/router/Router.jsx';
import Navbar from "./components/Navbar.jsx"
import { Routes, Route } from 'react-router';
import AddProduct from './pages/AddProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import ViewProduct from './pages/ViewProduct.jsx';
import LandingPage from './components/LandingPage.jsx';

// axios.defaults.withCredentials = true;

function App() {
  return (
    <>

      <Navbar />


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/view-product/:id" element={<ViewProduct />} />


      </Routes>
    </>
  )
}

export default App
