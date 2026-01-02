import { Link } from "react-router";
import axios from "axios";
export default function ProductRow({ product, index, page, limit, fetchProducts }) {
  const rowNumber = (page - 1) * limit + index + 1;

  async function handleDelete() {
    // Implement delete functionality here
    if(!confirm("Are you sure you want to delete this product?")){
      return;
    }
    console.log(`Delete product with ID: ${product._id}`);

    try{
      const res= await axios.delete(`http://localhost:3000/api/product/${product._id}`);
      console.log("Delete response:",res.data);
      alert("Product deleted successfully");
      // window.location.reload(); 
      fetchProducts();


    }catch(err){
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    } 
  }

  return (
    <tr className="product-row">
      <td data-label="#">{rowNumber}</td>

      <td data-label="Name">{product.name}</td>
      <td data-label="Category">{product.category}</td>
      <td data-label="Price">{product.price}</td>
      <td data-label="Qty">{product.quantity}</td>

      <td data-label="Actions" className="actions">
        <Link to={`/view-product/${product._id}`} className="btn view">
          View
        </Link>
        <Link to={`/edit-product/${product._id}`} className="btn edit">
          Edit
        </Link>
        <button className="btn delete" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}
