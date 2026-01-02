import { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router";
import "../styles/productForm.css";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({name:"",description:"",price:"",quantity:"",category:""});
  const [loading, setLoading] = useState(false);
  // useState({
  //   name: "Sample Product",
  //   description: "Sample description",
  //   price: 100,
  //   quantity: 10,
  //   category: "Electronics",
  // });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing product data to pre-fill the form
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/api/single-product/${id}`);
        const data = res.data;
        setFormData({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          quantity: data.product.quantity,
          category: data.product.category,
        });


      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  // Handle text / number / select inputs
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle file input
  function handleFileChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(loading){
      return;
    }
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);

    if (imageFile) {
      data.append("imageFile", imageFile);
    }

    // 🔽 API call example
    try {
      const res = await axios.put(`http://localhost:3000/api/product/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result =  res.data;
      console.log(result);
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update failed", error);
    }
    finally{
      setLoading(false)

    }
  }

  if(formData.name==""){
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Link to="/" className="back-link">
          {"< "}Back
        </Link>
      </div>

      <div className="product-form-container">
        <h2>Edit Product</h2>

        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>
          </label>

          <label>
            Image
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <button type="submit" className="submit-btn" disabled={loading} >
           {loading?"Loading":"Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
