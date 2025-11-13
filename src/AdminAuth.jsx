import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [error, setError] = useState('');

  // Load password from localStorage on component mount
  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    if (!savedPassword) {
      // Set default password if none exists
      localStorage.setItem('adminPassword', 'quickfox');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const savedPassword = localStorage.getItem('adminPassword') || 'quickfox';
    
    if (password === savedPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }
    
    // Save new password to localStorage
    localStorage.setItem('adminPassword', newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
    setError('Password changed successfully!');
    setTimeout(() => setError(''), 3000);
  };

  if (isAuthenticated) {
    return (
      <div className="relative">
        {showChangePassword && (
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setShowChangePassword(false)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        )}
        
        {showChangePassword ? (
          <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
              
              {error && (
                <div className="bg-red-500/30 text-red-100 p-3 rounded-lg mb-4 text-center">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label className="block text-white mb-2 font-medium">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-white mb-2 font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-all"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all"
              >
                Change Password
              </button>
            </div>
            <AdminPanel />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Admin Panel</h1>
        <p className="text-white/80 text-center mb-8">Enter password to access</p>
        
        {error && (
          <div className="bg-red-500/30 text-red-100 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-white mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black hover:bg-black-500 text-white font-bold py-3 px-4 rounded-full transition-all"
          >
            Enter Vault
          </button>
        </form>
        
        <div className="mt-6 text-center text-white/70 text-sm">
          <p>Enter the admin password to access the panel</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;