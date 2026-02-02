import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, Database, Calendar, Tag, CheckCircle, 
  Code as CodeIcon, Lightbulb, Bell, BellOff, Copy, Check,
  Edit, Trash2, Download, Share2
} from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
        // Assuming there's a user preference for reminders
        setRemindersEnabled(response.data.remindersEnabled !== false);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(problem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleReminders = async () => {
    try {
      // API call to toggle reminders for this problem
      await api.patch(`/problems/${id}/reminders`, { enabled: !remindersEnabled });
      setRemindersEnabled(!remindersEnabled);
    } catch (error) {
      console.error("Error toggling reminders:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await api.delete(`/problems/${id}`);
        navigate('/problems');
      } catch (error) {
        console.error("Error deleting problem:", error);
      }
    }
  };

  if (loading) {
     return (
        <>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 flex items-center justify-center pt-24">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full"
              />
          </div>
        </>
     );
  }

  if (!problem) {
      return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 flex flex-col items-center justify-center pt-24">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Problem not found</h2>
                <button 
                  onClick={() => navigate('/problems')} 
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Go back to problems
                </button>
            </div>
          </>
      )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between mb-8">
            <motion.button 
              onClick={() => navigate('/problems')}
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Problems
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleReminders}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all shadow-md ${
                  remindersEnabled 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-purple-400'
                }`}
              >
                {remindersEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                {remindersEnabled ? 'Reminders On' : 'Reminders Off'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-white border-2 border-gray-200 rounded-xl text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all shadow-md"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="p-2.5 bg-white border-2 border-gray-200 rounded-xl text-red-600 hover:border-red-300 hover:bg-red-50 transition-all shadow-md"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Main Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden"
          >
            
            {/* Header Section */}
            <div className="p-8 bg-gradient-to-r from-orange-100 via-yellow-100 to-pink-100 border-b-2 border-orange-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      {problem.title}
                    </h1>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                      problem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                      problem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                      'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-gray-600 text-sm flex-wrap">
                    <span className="flex items-center gap-2 font-semibold">
                      <Tag className="w-4 h-4" />
                      {problem.topic}
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      <Calendar className="w-4 h-4" />
                      {new Date(problem.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      <CodeIcon className="w-4 h-4" />
                      {problem.language}
                    </span>
                    {problem.isSolved && (
                      <span className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle className="w-4 h-4" />
                        Solved
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-xl font-bold shadow-lg border-2 border-orange-500">
                    <Clock className="w-5 h-5" />
                    <span>{problem.timeComplexity}</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg border-2 border-purple-600">
                    <Database className="w-5 h-5" />
                    <span>{problem.spaceComplexity}</span>
                  </div>
                </div>
              </div>

              {/* Reminder Status Banner */}
              {remindersEnabled && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200 flex items-center gap-3"
                >
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">Revision Reminders Active</p>
                    <p className="text-xs text-gray-600">You'll receive email reminders on Day 4 and Day 7 to help reinforce your learning</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              
              {/* Left: Problem Statement & Intuition */}
              <div className="lg:col-span-3 p-8 space-y-8 border-r-2 border-orange-100">
                
                {/* Problem Statement */}
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                    Problem Statement
                  </h3>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 shadow-md">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                  </div>
                </section>

                {/* Intuition */}
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Intuition & Approach
                  </h3>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-md">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{problem.intuition}</p>
                  </div>
                </section>

                {/* Tags */}
                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-700 font-semibold shadow-sm hover:border-orange-300 hover:bg-orange-50 transition-all"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right: Code Solution */}
              <div className="lg:col-span-2 p-8 bg-gradient-to-br from-gray-50 to-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <CodeIcon className="w-5 h-5" />
                    Your Solution
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm text-sm font-semibold"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-700">
                  {/* Code Editor Header */}
                  <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-mono font-semibold">{problem.language}</span>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
                    <pre className="text-sm font-mono text-gray-100 leading-relaxed">
                      <code>{problem.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Additional Info Card */}
                <div className="mt-6 p-6 bg-white rounded-2xl border-2 border-blue-200 shadow-md">
                  <h4 className="text-sm font-bold text-gray-700 mb-4">Problem Insights</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600 font-semibold">Time Complexity:</span>
                      <span className="font-mono font-bold text-orange-600">{problem.timeComplexity}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600 font-semibold">Space Complexity:</span>
                      <span className="font-mono font-bold text-purple-600">{problem.spaceComplexity}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600 font-semibold">Language:</span>
                      <span className="font-semibold text-gray-800">{problem.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-semibold">Uploaded:</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(problem.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProblemDetails;
