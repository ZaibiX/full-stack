import React, { useState, useEffect } from 'react';
import { 
  TextField, MenuItem, Button, Paper, Typography, InputAdornment, Box, CircularProgress 
} from '@mui/material';
import { ArrowBack, Edit, CloudUpload } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", quantity: "", category: ""
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/api/single-product/${id}`);
        const product = res.data.product;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append("imageFile", imageFile);

    try {
      await axiosInstance.put(`/api/product/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/app/products");
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-4 hover:underline">
        <ArrowBack fontSize="small" className="mr-1" /> Back to Products
      </button>

      <Paper className="p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 md:w-11/12 mx-auto">
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>Edit Product</Typography>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            fullWidth label="Product Name" name="name"
            value={formData.name} onChange={handleChange} required
          />

          <TextField
            fullWidth label="Description" name="description" multiline rows={3}
            value={formData.description} onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Price" name="price" type="number" required
              value={formData.price} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
            <TextField
              label="Quantity" name="quantity" type="number" required
              value={formData.quantity} onChange={handleChange}
            />
          </div>

          <TextField
            fullWidth select label="Category" name="category"
            value={formData.category} onChange={handleChange} required
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
          </TextField>

          <Button
            variant="outlined" component="label" startIcon={<CloudUpload />}
            className="w-full py-3 border-dashed"
          >
            {imageFile ? imageFile.name : "Update Image (Optional)"}
            <input type="file" hidden accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </Button>

          <Button 
            type="submit" fullWidth variant="contained" 
            size="large" startIcon={<Edit />}
            className="bg-blue-600 h-12 mt-4 normal-case"
            disabled={loading}
          >
            {loading ? "Saving Changes..." : "Update Product Details"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EditProduct;