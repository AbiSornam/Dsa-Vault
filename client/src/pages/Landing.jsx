import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, LineChart, FolderGit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md"
  >
    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            &lt;/&gt;
          </div>
          <span className="font-bold text-xl text-gray-900">CodeIntuit</span>
        </div>
        <Link 
          to="/login"
          className="px-6 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 transition font-medium"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 flex items-center gap-2"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
          AI-Powered Code Intelligence
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4"
        >
          Master Coding Problems
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-primary-600 mb-8"
        >
          Build Deep Intuition
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-500 max-w-2xl mb-12"
        >
          Transform your approach to learning algorithms with AI-powered insights,
          automated complexity analysis, and intelligent progress tracking.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/register" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition flex items-center gap-2">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <button className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">
             Learn More
          </button>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 w-full">
            <FeatureCard 
                icon={Code2}
                title="AI-Powered Analysis"
                description="Transform complex coding solutions into clear, understandable insights with advanced AI that understands algorithmic patterns."
            />
            <FeatureCard 
                icon={LineChart}
                title="Visual Progress Tracking"
                description="Beautiful, interactive dashboards that visualize your learning journey, complexity trends, and skill development patterns."
            />
            <FeatureCard 
                icon={FolderGit2}
                title="Smart Organization"
                description="Intelligent file management with drag-and-drop functionality, automatic tagging, and powerful search capabilities."
            />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        &lt;/&gt;
                    </div>
                    <span className="font-bold text-gray-900">CodeIntuit</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Empowering developers worldwide with AI-powered coding insights.
                </p>
            </div>
            {/* ... Other footer links ... */}
        </div>
      </footer>
    </div>
  );
};

export default Landing;
