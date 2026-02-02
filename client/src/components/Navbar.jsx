import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Folder, Trophy, Bell, User, Award, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
        to={to} 
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isActive 
            ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-md' 
            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
        }`}
    >
        <Icon size={18} />
        {label}
    </Link>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
             <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent hidden sm:block">DSA Vault</span>
             </Link>
             
             <div className="hidden md:flex items-center gap-1">
                <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavLink to="/upload" icon={UploadCloud} label="Upload" />
                <NavLink to="/problems" icon={Folder} label="My Problems" />
                <NavLink to="/badges" icon={Award} label="Badges" />
                <NavLink to="/leaderboard" icon={Trophy} label="Leaderboard" />
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl relative transition-all">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="relative group">
                <button className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition-transform shadow-md">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all font-medium mt-1"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
