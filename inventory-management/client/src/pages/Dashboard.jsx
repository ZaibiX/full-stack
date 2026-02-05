import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { 
  Inventory, Warning, AdminPanelSettings, Store, 
  Badge as BadgeIcon, Category, ArrowForward 
} from '@mui/icons-material';
import { useNavigate, Navigate } from 'react-router';
import axiosInstance from '../utils/axiosInstance';
import useAuth from '../store/authStore';

const DashboardContent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosInstance.get('/api/dashboard-data');
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  // Helper to map backend roles/categories to your existing UI structure
  const stats = [
    { label: 'Total Products', value: data?.products?.total || 0, icon: <Inventory />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Admins', value: data?.users?.roleDistribution.find(r => r._id === 'Admin')?.count || 0, icon: <AdminPanelSettings />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Managers', value: data?.users?.roleDistribution.find(r => r._id === 'Store-manager')?.count || 0, icon: <Store />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Employees', value: data?.users?.roleDistribution.find(r => r._id === 'Employee')?.count || 0, icon: <BadgeIcon />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const getCategoryColor = (name) => {
    const colors = { Electronics: 'bg-blue-500', Clothing: 'bg-purple-500', Books: 'bg-amber-500' };
    return colors[name] || 'bg-gray-500';
  };
 if (user?.role==='Employee'){
    return <Navigate to="/app/products" replace />;
  }
  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Managing {data?.products?.total} items across {data?.products?.categories.length} categories.</p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-3 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center text-center">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* CATEGORY BREAKDOWN SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Category className="text-gray-400" /> Category Distribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data?.products?.categories.map((cat, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">{cat._id}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded-lg shadow-sm">{cat.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${getCategoryColor(cat._id)} h-full`} 
                      style={{ width: `${(cat.count / (data.products.total || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT PRODUCTS TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Recent Products</h2>
              <button onClick={() => navigate('/app/products')} className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                View All <ArrowForward fontSize="small" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Product Name</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.products?.recent.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-700">{product.name}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{product.category}</td>
                      <td className="px-6 py-4 text-gray-700">{product.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.quantity > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {product.quantity > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR: LOW STOCK ALERTS --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-rose-600">
              <Warning />
              <h2 className="text-lg font-bold">Low Stock Alerts</h2>
              <span className="ml-auto bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {data?.products?.lowStock.length} TOTAL
              </span>
            </div>
            <div className="space-y-4">
              {data?.products?.lowStock.slice(0, 5).map(product => (
                <div key={product._id} className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-rose-600">Stock: {product.quantity}</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/app/products/edit-product/${product._id}`)}
                    className="text-xs bg-white text-rose-600 px-3 py-1 rounded-lg border border-rose-200 font-bold hover:bg-rose-600 hover:text-white transition"
                  >
                    Update
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default DashboardContent;