import { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'
import axios from 'axios';
import Router from './components/router/Router.jsx';
import Navbar from "./components/Navbar.jsx"
import { Routes, Route, Navigate } from 'react-router';
import AddProduct from './pages/products/AddProduct.jsx';
import EditProduct from './pages/products/EditProduct.jsx';
import ViewProduct from './pages/products/ViewProduct.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Products from './pages/products/Products.jsx';
// import DashboardContent from './components/DashboardContent.jsx';
// import MiniDrawer from './components/MiniDrawer.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Users from './pages/users/Users.jsx';
import CreateUser from './pages/users/CreateUser.jsx';
import EditUser from './pages/users/EditUser.jsx';



// axios.defaults.withCredentials = true;

function App() {
  return (
    //use layouts with nested routes
    <>

      {/* <Navbar /> */}


     <Routes>
  <Route path="/" element={<LandingPage />} />
  
  <Route path='/app' element={<DashboardLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />

    {/* PRODUCT GROUP */}
    <Route path='products'>
      <Route index element={<Products />} /> {/* The main list */}
      <Route path="add-product" element={<AddProduct />} />
      <Route path="edit-product/:id" element={<EditProduct />} />
      <Route path="view-product/:id" element={<ViewProduct />} />
    </Route>

    {/* USER GROUP */}
    <Route path="users">
      <Route index element={<Users />} /> {/* The main list */}
      <Route path="create-user" element={<CreateUser />} />
      <Route path="edit-user/:id" element={<EditUser />} />
    </Route>
  </Route>


        {/* <Route path="/dashboard">
        <Route index element={<Dashboard />} />
        <Route path='users' element={<Users />} />

      </Route>

       <Route path="/dashboard" element={<Dashboard />}>
        <Route path='users' element={<Users />} />

      </Route> */}

      </Routes>
    </>
  )
}

export default App
