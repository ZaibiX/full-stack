import React from 'react';
import { Box, Typography, IconButton, Badge, Tooltip } from '@mui/material';
import { 
  People, Inventory, Warning, TrendingUp, 
  AdminPanelSettings, Store, Badge as BadgeIcon,
  Category, ArrowForward
} from '@mui/icons-material';

const DashboardContent = () => {
  // 1. MOCK DATA: In MongoDB, use the aggregate query I showed you earlier
  const categoryTotals = [
    { name: 'Electronics', count: 450, color: 'bg-blue-500' },
    { name: 'Clothing', count: 120, color: 'bg-purple-500' },
    { name: 'Books', count: 670, color: 'bg-amber-500' },
  ];

  // 2. LOW STOCK LOGIC: Fetch only WHERE stock < 10
  const lowStockAlerts = [
    { id: 1, name: 'MacBook Pro M2', stock: 2, min: 5 },
    { id: 2, name: 'Logitech Mouse', stock: 1, min: 10 },
  ];
  const totalLowStockItems = 14; // Example: Count from db.products.countDocuments({stock: {$lt: 10}})

  const stats = [
    { label: 'Total Products', value: '1,240', icon: <Inventory />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Admins', value: '3', icon: <AdminPanelSettings />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Managers', value: '12', icon: <Store />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Employees', value: '45', icon: <BadgeIcon />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Managing {stats[0].value} items across {categoryTotals.length} categories.</p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- MAIN CONTENT: CATEGORY TOTALS & RECENT PRODUCTS --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CATEGORY BREAKDOWN SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Category className="text-gray-400" /> Category Distribution
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categoryTotals.map((cat, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">{cat.name}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded-lg shadow-sm">{cat.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full`} style={{ width: `${(cat.count / 1240) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT PRODUCTS TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Recent Products</h2>
              <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
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
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-700">iPhone 15 Pro</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">Electronics</td>
                    <td className="px-6 py-4 text-gray-700">42</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">In Stock</span>
                    </td>
                  </tr>
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
              {/* This Badge handles the "thousands of items" problem by showing the total count */}
              <span className="ml-auto bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {totalLowStockItems} TOTAL
              </span>
            </div>
            <div className="space-y-4">
              {lowStockAlerts.map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{alert.name}</p>
                    <p className="text-xs text-rose-600">Stock: {alert.stock}</p>
                  </div>
                  <button className="text-xs bg-white text-rose-600 px-3 py-1 rounded-lg border border-rose-200 font-bold hover:bg-rose-600 hover:text-white transition">
                    Restock
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-bold text-gray-500 hover:text-rose-600 transition border-t border-gray-50">
              View All {totalLowStockItems} Alerts
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default DashboardContent;