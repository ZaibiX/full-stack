import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    // API Call: axios.get(`/api/users/${id}`).then(res => setFormData(res.data))
    // For now, using dummy data
    async function fetchUserDetails() {
      const response = await axiosInstance.get(`/api/user/${id}`);
      setFormData(response.data);
    }
    // setFormData({ name: 'John Doe', email: 'john@example.com', role: 'Admin' });
    fetchUserDetails();
  }, [id]);

  async function handleUpdate() {
    // API Call: axios.put(`/api/users/${id}`, formData)
    console.log("Updating user:", id, formData);
    await axiosInstance.put(`/api/user/${id}`, formData);
    navigate('/app/users');
  }
  
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <Paper className="p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm md:w-4/5 ">
        <Typography variant="h5" sx={{fontWeight:"bold", mb:3}} >Edit User Details</Typography>
        <div className="space-y-5 flex flex-col gap-4">
          <TextField 
            fullWidth label="Name" value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <TextField 
            fullWidth label="Email" value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField 
            fullWidth select label="Role" value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Store-manager">Store-manager</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </TextField>
          
          <div className="flex gap-3 pt-4">
            <Button fullWidth variant="outlined" onClick={() => navigate('/app/users')}>Cancel</Button>
            <Button fullWidth variant="contained" color="primary" onClick={handleUpdate}
            className="bg-blue-600">Update User</Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default EditUser;