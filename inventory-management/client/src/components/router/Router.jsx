import {BrowserRouter, Routes, Route} from "react-router";
import Dashboard from "../../pages/Dashboard.jsx";
import AddProduct from "../../pages/products/AddProduct.jsx";
import EditProduct from "../../pages/products/EditProduct.jsx";
import ViewProduct from "../../pages/products/ViewProduct.jsx";
import App from "../../App.jsx";

export default function Router()
{
    return(
         <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/view-product/:id" element={<ViewProduct />} />


            </Routes>
           
       
    )
}