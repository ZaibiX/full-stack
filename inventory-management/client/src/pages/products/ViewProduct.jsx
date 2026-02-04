import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Paper, Typography, Box, CircularProgress, Divider, Chip } from "@mui/material";
import { ArrowBack, Inventory, Category, AttachMoney } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axiosInstance.get(`/api/single-product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box className="flex flex-col justify-center items-center h-64 gap-4">
        <CircularProgress size={50} />
        <Typography color="textSecondary">Loading product details...</Typography>
      </Box>
    );
  }

  if (!product) {
    return <Typography className="p-8 text-center">Product not found.</Typography>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-600 mb-6 hover:underline transition-all"
      >
        <ArrowBack fontSize="small" className="mr-1" /> Back to Products
      </button>

      <Paper className="p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Product Image Section */}
          <Box className="rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
            <img 
              src={product.imageUrl || "https://via.placeholder.com/400"} 
              alt={product.name} 
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </Box>

          {/* Product Info Section */}
          <div className="space-y-4">
            <div>
              <Chip label={product.category} color="primary" variant="outlined" size="small" className="mb-2" />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>{product.name}</Typography>
            </div>

            <Divider />

            <Typography variant="body1" color="textSecondary" className="leading-relaxed">
              {product.description || "No description provided for this product."}
            </Typography>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-full">
                  <AttachMoney className="text-green-600" />
                </div>
                <div>
                  <Typography variant="caption" color="textSecondary">Price</Typography>
                  <Typography variant="h6" className="font-bold">${product.price}</Typography>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Inventory className="text-blue-600" />
                </div>
                <div>
                  <Typography variant="caption" color="textSecondary">Stock Available</Typography>
                  <Typography variant="h6" className="font-bold">{product.quantity} units</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}