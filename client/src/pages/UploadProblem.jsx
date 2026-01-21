import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Sparkles, Code as CodeIcon, FileText, 
  Hash, Tag, Save, CheckCircle, AlertCircle, Loader2 
} from 'lucide-react';
import api from '../services/api';

const UploadProblem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
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
      
      // Don't navigate away immediately so they can see the AI result
      // But maybe provide a button to go to dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24"> {/* Added pt-24 for navbar spacing if needed */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Upload className="text-indigo-600 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Upload Problem</h1>
              <p className="text-slate-500 text-sm">Paste your solution and let AI analyze it</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Problem Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Two Sum"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Topic</label>
                <input 
                  type="text" 
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Arrays"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                <select 
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Problem Statement</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Paste the problem description here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Solution</label>
              <div className="relative">
                <textarea 
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Paste your code here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono text-sm bg-slate-50"
                  required
                />
                <div className="absolute top-3 right-3 text-xs text-slate-400 font-mono border px-2 py-1 rounded bg-white">
                  {formData.language}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="dp, recursion, sliding window"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
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
            </button>
          </form>
        </motion.div>

        {/* Right Column: Analysis Result */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {!result && !loading && (
             <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Sparkles className="w-16 h-16 mb-4 text-indigo-200" />
                <h3 className="text-lg font-medium text-slate-600">AI Analysis Pending</h3>
                <p className="max-w-xs mt-2">Submit your problem to get instant feedback, complexity analysis, and intuition breakdown.</p>
             </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               >
                 <Sparkles className="w-16 h-16 text-indigo-500" />
               </motion.div>
               <h3 className="text-lg font-medium text-slate-900 mt-6">Analyzing your code...</h3>
               <p className="text-slate-500 mt-2">Extracting time complexity and intuition</p>
            </div>
          )}

          {result && (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-4 bg-green-50 rounded-bl-2xl text-green-700 font-medium text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Saved Successfully
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Analysis Report</h2>
                   <div className="flex gap-4 mt-4">
                      <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                        ⏱️ Time: {result.timeComplexity || 'N/A'}
                      </div>
                      <div className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                        💾 Space: {result.spaceComplexity || 'N/A'}
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Intuition</h3>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {result.intuition || "No intuition generated."}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                   <button 
                     onClick={() => navigate('/dashboard')}
                     className="text-indigo-600 font-medium hover:text-indigo-800"
                   >
                     Go to Dashboard →
                   </button>
                </div>

              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default UploadProblem;
