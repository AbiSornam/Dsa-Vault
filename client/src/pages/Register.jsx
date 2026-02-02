import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PeekingMascot = () => (
  <div className="relative w-20 h-16">
    <svg viewBox="0 0 120 90" className="w-full h-full">
      {/* Head */}
      <path d="M20 80 Q60 10 100 80" fill="#7B4A2F" stroke="#4A2D1B" strokeWidth="2" />
      {/* Ear tufts */}
      <path d="M25 35 Q20 15 35 20" fill="#7B4A2F" stroke="#4A2D1B" strokeWidth="2" />
      <path d="M95 35 Q100 15 85 20" fill="#7B4A2F" stroke="#4A2D1B" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="45" cy="50" r="14" fill="white" stroke="#4A2D1B" strokeWidth="2" />
      <circle cx="75" cy="50" r="14" fill="white" stroke="#4A2D1B" strokeWidth="2" />
      <circle cx="48" cy="52" r="6" fill="#1F1F1F" />
      <circle cx="78" cy="52" r="6" fill="#1F1F1F" />
      <circle cx="46" cy="50" r="2" fill="white" />
      <circle cx="76" cy="50" r="2" fill="white" />
      {/* Beak */}
      <path d="M60 58 L52 70 L68 70 Z" fill="#F5C542" stroke="#C99A2E" strokeWidth="2" />
      {/* Paws */}
      <path d="M38 82 Q45 70 55 78" fill="#5A3522" />
      <path d="M82 82 Q75 70 65 78" fill="#5A3522" />
    </svg>
  </div>
);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success('Welcome to CodeIntuit! 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-300 p-6">
      <div className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-br from-orange-500 to-yellow-400 p-8 md:p-12 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute right-6 top-6 h-64 w-32 rounded-2xl bg-white/20" />

        <div className="relative">
          <div className="flex items-center gap-3 text-white mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">📚</div>
            <span className="font-bold text-xl">DSA Vault</span>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md bg-white/80 rounded-2xl p-8 shadow-xl">
              {/* Peeking mascot */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <PeekingMascot />
              </div>

              <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome to DSA Vault</h2>
                <p className="text-sm text-gray-600">Create your account to start building your DSA skills ✨</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-500 text-white font-semibold py-3 shadow-md hover:bg-blue-600 transition"
                >
                  Sign Up →
                </button>
              </form>

              <div className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Log in
                </Link>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/80 mt-6">Privacy Policy • Protected by reCAPTCHA</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
