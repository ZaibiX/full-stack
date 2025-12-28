import { useState } from 'react'

import './App.css'
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null)
  const [productName, setProductName] = useState("")

  function handleChange(e) {
    setProductName(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(file)
    const formData = new FormData();
    formData.append('imageFile', file);

    formData.append('name', productName);
    formData.append('price', 300);
    formData.append('quantity', 2);
    formData.append('description', "product description");
    formData.append('category', "Electronics");

    await axios.post('http://localhost:3000/api/product', formData);

    
  }
  return (
   <form onSubmit={handleSubmit}>
    <input type="file" onChange={(e) => setFile(e.target.files[0])} name="file"/>
    <input type="text" name="name" placeholder="Product Name" value={productName} onChange={handleChange} />
    <input type="submit" value="Upload" />
   </form>
  )
}

export default App
