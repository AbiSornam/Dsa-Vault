import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Folder, Trophy, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive 
            ? 'bg-indigo-50 text-indigo-600' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
             <Link to="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    &lt;/&gt;
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:block">CodeIntuit</span>
             </Link>
             
             <div className="hidden md:flex items-center gap-2">
                <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavLink to="/upload" icon={UploadCloud} label="Upload" />
                <NavLink to="/problems" icon={Folder} label="My Problems" />
                <NavLink to="/leaderboard" icon={Trophy} label="Leaderboard" />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <ThemeSwitcher />
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             <div className="relative group">
                <button className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                    {user?.name?.[0] || 'U'}
                </button>
                {/* Simple dropdown for logout for now */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
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
