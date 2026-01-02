import { useState } from "react";
import "../styles/productForm.css";
import { Link, useNavigate } from "react-router";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // handle text & select inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // handle file input separately
  function handleFileChange(e) {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Create FormData object
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);
    data.append("imageFile", formData.imageFile);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = res.data;
      console.log("Product added:", result);

      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
        <div><Link to="/" className="back-link"> {"< "}Back</Link></div>
        <div className="product-form-container">
      <h2>Add Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>
        </label>

        <label>
          Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading?"Loading":"Add Product"}
        </button>
      </form>
    </div>
    </div>
  );
}
