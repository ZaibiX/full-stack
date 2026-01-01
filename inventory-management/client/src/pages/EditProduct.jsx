import "../styles/productForm.css";
import { Link } from "react-router";

export default function EditProduct() {
  return (
    <div>
        <div><Link to="/" className="back-link"> {"< "}Back</Link></div>
    <div className="product-form-container">
      <h2>Edit Product</h2>

      <form className="product-form">
        <label>
          Name
          <input type="text" defaultValue="Sample Product" />
        </label>

        <label>
          Description
          <textarea defaultValue="Sample description"></textarea>
        </label>

        <label>
          Price
          <input type="number" defaultValue={100} />
        </label>

        <label>
          Quantity
          <input type="number" defaultValue={10} />
        </label>

        <label>
          Category
          <select defaultValue="Electronics">
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>
        </label>

        <label>
          Image
          <input type="file" />
        </label>

        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
    </div>
  );
}
