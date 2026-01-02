import "../styles/viewProduct.css";
import { Link,useParams } from "react-router";  
import { useEffect, useState } from "react"; 
import axios from "axios";

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(()=>{
     async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/api/single-product/${id}`);
        console.log("Single product data:", res.data);
        const data = res.data;
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  },[id]);
  // const product = {
  //   name: "Wireless Headphones",
  //   description: "Noise-cancelling wireless headphones",
  //   price: 120,
  //   quantity: 25,
  //   category: "Electronics",
  //   imageUrl: "https://via.placeholder.com/300",
  // };

  if(!product){
    return <div>Loading...</div>;
  }



  return (
    <div>
        <div><Link to="/" className="back-link"> {"< "}Back</Link></div>
    <div className="view-product-container">
      <h2>Product Details</h2>

      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />

        <div className="product-info">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
        </div>
      </div>
    </div>
    </div>
  );
}
