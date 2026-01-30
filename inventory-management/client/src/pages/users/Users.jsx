import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Typography, Chip 
} from '@mui/material';
import { Edit, Delete, PersonAdd, Mail, Shield } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Users = () => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock Data - Replace with your API call: axios.get('/api/users')
  const users = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { _id: '2', name: 'Sarah Smith', email: 'sarah@store.com', role: 'Store-manager' },
  ];

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    console.log("Deleting user:", selectedUser._id);
    // API Call: axios.delete(`/api/users/${selectedUser._id}`)
    setOpenDelete(false);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Manage team members and their access levels.</p>
        </div>
        <Button 
          variant="contained" 
          startIcon={<PersonAdd />} 
          onClick={() => navigate('create-user')}
          className="bg-blue-600 hover:bg-blue-700 normal-case shadow-none"
        >
          Create User
        </Button>
      </div>

      <TableContainer component={Paper} className="shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">User Details</TableCell>
              <TableCell className="font-bold">Role</TableCell>
              <TableCell className="font-bold align-middle">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{user.name}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail className="text-[14px]" /> {user.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    size="small" 
                    color={user.role === 'Admin' ? 'primary' : 'default'}
                    className="font-medium"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`edit-user/${user._id}`)} color="primary" size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user)} color="error" size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete User?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            Are you sure you want to delete <b>{selectedUser?.name}</b>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setOpenDelete(false)} color="inherit">Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Delete User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;