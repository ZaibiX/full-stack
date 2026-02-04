import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Typography, Chip , CircularProgress
} from '@mui/material';
import { Edit, Delete, PersonAdd, Mail, Shield } from '@mui/icons-material';
import { useNavigate } from 'react-router';

import UserTable from '../../components/users/table';
import axiosInstance from '../../utils/axiosInstance';

const Users = () => {


  // Mock Data - Replace with your API call: axios.get('/api/users')
  // const users = [
  //   { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  //   { _id: '2', name: 'Sarah Smith', email: 'sarah@store.com', role: 'Store-manager' },
  // ];

  const [users, setUsers] = useState([]);
  useEffect(() => {
    // console.log("Users data: ", users);
    async function fetchUsers(){
      // API Call to fetch users
      const response = await axiosInstance.get('/api/users');
      console.log("Fetched users: ", response.data);

      setUsers(response.data);
    }

    fetchUsers();
  }, []);

  async function handleDelete(id) {
    try{
      const response = await axiosInstance.delete(`/api/user/${id}`);
    setUsers(users.filter(user => user._id !== id));
    // console.log("Delete response: ", response);

    }
    catch(error){
      console.error("Error deleting user:", error.response?.data?.message|| error.message);
  }
}

  if(users.length === 0){
    return <div className='flex flex-col items-center justify-center h-screen w-full'>
          <CircularProgress />
        </div>;
  }
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <UserTable users={users} onDelete={handleDelete}/>
    </div>
  );
};

export default Users;