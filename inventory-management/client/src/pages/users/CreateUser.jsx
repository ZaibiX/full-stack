import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Paper, Typography } from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'Employee'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submit:", formData);
    // API Call: axios.post('/api/users', formData)
    try{
      const response = await axiosInstance.post('/api/user', formData);
      // console.log("User created:", response.data);

    } 
    catch(err){
      console.error("Error creating user:", err.response?.data?.message|| err.message);
      setLoading(false);
      return;
    }
    navigate('/app/users');
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-4 hover:underline">
        <ArrowBack fontSize="small" className="mr-1" /> Back to Users
      </button>

      <Paper className="p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 md:w-4/5 ">
        <Typography variant="h5" sx={{fontWeight:"bold", mb:3}} >Create New User</Typography>
        
        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col gap-4 ">
          <TextField
            fullWidth label="Full Name" required
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <TextField
            fullWidth label="Email Address" type="email" required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            fullWidth label="Password" type="password" required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <TextField
            fullWidth select label="Role" value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Store-manager">Store-manager</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </TextField>

          <Button 
            type="submit" fullWidth variant="contained" 
            size="large" startIcon={<Save />}
            className="bg-blue-600 h-12 mt-4"
            loading={loading}
          >
            Create User Account
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default CreateUser;