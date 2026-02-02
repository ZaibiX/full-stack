import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Typography, Chip 
} from '@mui/material';
import { Edit, Delete, PersonAdd, Mail, Shield } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import UserTable from '../../components/users/table';

const Users = () => {


  // Mock Data - Replace with your API call: axios.get('/api/users')
  const users = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { _id: '2', name: 'Sarah Smith', email: 'sarah@store.com', role: 'Store-manager' },
  ];

  

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <UserTable users={users} />
    </div>
  );
};

export default Users;