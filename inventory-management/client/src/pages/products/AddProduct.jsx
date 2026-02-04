import React, { useState } from 'react';
import { 
  Box, TextField, MenuItem, Button, Paper, Typography, InputAdornment, IconButton 
} from '@mui/material';
import { ArrowBack, Save, CloudUpload, Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      await axiosInstance.post('/api/product', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/app/products');
    } catch (err) {
      console.error("Error adding product:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/app/products')} 
        className="flex items-center text-blue-600 mb-4 hover:underline transition-all"
      >
        <ArrowBack fontSize="small" className="mr-1" /> Back to Products
      </button>

      <Paper className="p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 md:w-11/12 mx-auto">
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            fullWidth label="Product Name" name="name"
            value={formData.name} onChange={handleChange} required
          />

          <TextField
            fullWidth label="Description" name="description"
            multiline rows={3} value={formData.description}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Price" name="price" type="number"
              value={formData.price} onChange={handleChange} required
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Quantity" name="quantity" type="number"
              value={formData.quantity} onChange={handleChange} required
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

          {/* Styled File Upload */}
          <Box className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button 
                variant="outlined" component="span" 
                startIcon={<CloudUpload />}
                sx={{ mb: formData.imageFile ? 1 : 0 }}
              >
                {formData.imageFile ? "Change Image" : "Upload Product Image"}
              </Button>
            </label>
            {formData.imageFile && (
              <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                <span className="truncate max-w-xs">{formData.imageFile.name}</span>
                <IconButton size="small" onClick={() => setFormData({...formData, imageFile: null})}>
                  <Clear fontSize="inherit" />
                </IconButton>
              </div>
            )}
          </Box>

          <Button
            type="submit" fullWidth variant="contained"
            size="large" startIcon={<Save />}
            disabled={loading}
            className="bg-blue-600 h-12 mt-2 normal-case text-lg"
            sx={{ borderRadius: 2 }}
          >
            {loading ? "Saving..." : "Add Product"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddProduct;