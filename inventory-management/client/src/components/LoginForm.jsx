import React, { useState } from 'react';
import { Mail, Lock, Login, ArrowForward } from '@mui/icons-material';
import useAuth from '../store/authStore';
import {Button} from '@mui/material';


const LoginForm = ({emailLoginRef}) => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const {login, authLoading} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    login(formData);
    // Integration logic for JWT goes here
  
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Please enter your details to access StockTrack.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Mail fontSize="small" />
            </span>
            <input
            ref={emailLoginRef}
              type="email"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="name@company.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock fontSize="small" />
            </span>
            <input
              type="password"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
          variant="contained"
          loading={authLoading}

        >
          Sign In <ArrowForward fontSize="small" />
        </Button>

        {/* <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Contact Admin</span>
        </p> */}
      </form>
    </div>
  );
};

export default LoginForm;