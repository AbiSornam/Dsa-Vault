import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Sparkles, Code as CodeIcon, FileText, 
  Hash, Tag, Save, CheckCircle, AlertCircle, Loader2, Clock, Zap 
} from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const UploadProblem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: 'JavaScript',
    difficulty: 'Medium',
    topic: '',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Convert tags string to array
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      
      const payload = {
        ...formData,
        tags: tagsArray
      };

      const response = await api.post('/problems', payload);
      setResult(response.data);
      
      // Check if new badges were earned - show celebration page
      if (response.data.newBadges && response.data.newBadges.length > 0) {
        // Navigate to first badge earned with celebration
        navigate('/badge-earned', { state: { badge: response.data.newBadges[0] } });
      }
      
      // Don't navigate away immediately so they can see the AI result
      // But maybe provide a button to go to dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Upload Your Solution
            </h1>
            <p className="text-gray-600 text-lg">Paste your code and get instant AI-powered feedback</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-orange-200 hover:shadow-3xl transition-all"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm border-2 border-red-200 shadow-md"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Problem Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Two Sum"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm focus:shadow-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                    <input 
                      type="text" 
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      placeholder="e.g., Arrays"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm focus:shadow-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                    <select 
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm focus:shadow-md"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                  <select 
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm focus:shadow-md"
                    required
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="Go">Go</option>
                    <option value="Rust">Rust</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Ruby">Ruby</option>
                    <option value="PHP">PHP</option>
                    <option value="Swift">Swift</option>
                    <option value="Kotlin">Kotlin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Problem Statement</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Paste the problem description here..."
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none resize-none transition-all shadow-sm focus:shadow-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Solution</label>
                  <div className="relative">
                    <textarea 
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Paste your code here..."
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none font-mono text-sm resize-none transition-all shadow-sm focus:shadow-md"
                      required
                    />
                    <div className="absolute top-3 right-3 text-xs text-orange-700 font-bold bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1.5 rounded-lg border-2 border-orange-300 shadow-md">
                      {formData.language}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="dp, recursion, sliding window"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm focus:shadow-md"
                  />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-xl hover:shadow-2xl disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Analysis & Save
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Right Column: Analysis Result */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {!result && !loading && (
                 <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white/70 backdrop-blur-md border-2 border-dashed border-orange-300 rounded-3xl shadow-lg">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-20 h-20 mb-4 text-orange-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">AI Analysis Pending</h3>
                    <p className="text-gray-500 max-w-xs">Submit your problem to get instant feedback, complexity analysis, and intuition breakdown.</p>
                 </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-orange-200">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                   >
                     <Sparkles className="w-20 h-20 text-orange-500" />
                   </motion.div>
                   <h3 className="text-xl font-bold text-gray-800 mt-6">Analyzing your code...</h3>
                   <p className="text-gray-600 mt-2">Extracting time complexity and intuition</p>
                   <div className="mt-6 flex gap-2">
                     <motion.div 
                       animate={{ scale: [1, 1.2, 1] }}
                       transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                       className="w-3 h-3 bg-orange-400 rounded-full"
                     />
                     <motion.div 
                       animate={{ scale: [1, 1.2, 1] }}
                       transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                       className="w-3 h-3 bg-yellow-400 rounded-full"
                     />
                     <motion.div 
                       animate={{ scale: [1, 1.2, 1] }}
                       transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                       className="w-3 h-3 bg-pink-400 rounded-full"
                     />
                   </div>
                </div>
              )}

              {result && (
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-green-200 overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-bl-3xl text-white font-bold text-sm flex items-center gap-2 shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                      Saved Successfully
                    </div>

                    <div className="mb-8 mt-4">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">AI Analysis Report</h2>
                       <div className="flex gap-3 mt-4 flex-wrap">
                          <div className="px-5 py-3 bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg border-2 border-orange-500">
                            <Clock className="w-4 h-4" />
                            Time: {result.timeComplexity || 'N/A'}
                          </div>
                          <div className="px-5 py-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg border-2 border-purple-600">
                            <Zap className="w-4 h-4" />
                            Space: {result.spaceComplexity || 'N/A'}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Intuition
                        </h3>
                        <p className="text-gray-800 leading-relaxed bg-gradient-to-br from-orange-100 to-yellow-100 p-6 rounded-2xl border-2 border-orange-200 shadow-md">
                          {result.intuition || "No intuition generated."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t-2 border-gray-100 flex gap-3">
                       <motion.button 
                         onClick={() => navigate('/dashboard')}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:from-orange-600 hover:to-yellow-500 transition-all"
                       >
                         Go to Dashboard →
                       </motion.button>
                       <motion.button 
                         onClick={() => {
                           setResult(null);
                           setFormData({
                             title: '',
                             description: '',
                             code: '',
                             language: 'JavaScript',
                             difficulty: 'Medium',
                             topic: '',
                             tags: ''
                           });
                         }}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all shadow-md hover:shadow-lg"
                       >
                         Upload Another
                       </motion.button>
                    </div>

                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProblem;
