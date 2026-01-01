import "../styles/viewProduct.css";
import { Link } from "react-router";        
export default function ViewProduct() {
  const product = {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones",
    price: 120,
    quantity: 25,
    category: "Electronics",
    imageUrl: "https://via.placeholder.com/300",
  };

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
