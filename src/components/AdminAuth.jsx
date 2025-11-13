import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

const AdminAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Default password is "quickfox"
  const DEFAULT_PASSWORD = 'quickfox';

  // Remove any existing authentication status on component mount
  useEffect(() => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
    
    if (password === storedPassword) {
      // Set authentication status but don't persist it
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
    
    if (currentPassword !== storedPassword) {
      setError('Current password is incorrect');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    
    localStorage.setItem('adminPassword', newPassword);
    setError('');
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="flex items-center bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all"
            >
              <ArrowLeft className="mr-2" />
              Back to Game
            </Link>
            <button 
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all"
            >
              {showChangePassword ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showChangePassword && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label className="block text-white mb-2 font-medium">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
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
                {error && <div className="text-red-300 mb-4">{error}</div>}
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}

          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8">
        <div className="text-center mb-8">
          <Lock className="mx-auto text-white mb-4" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/80">Enter password to access admin features</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-white mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>
          
          {error && <div className="text-red-300 mb-4 text-center">{error}</div>}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Enter Vault
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2" />
            Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;