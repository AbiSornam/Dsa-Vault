import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Folder, Trash2, ArrowRight, Plus, LayoutGrid, Clock, Zap, MoreVertical, Eye, Edit, Download } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const Problems = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [folderFilter, setFolderFilter] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);
  const [showFolderMenu, setShowFolderMenu] = useState(false); 

  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        try {
            const [problemsRes, foldersRes] = await Promise.all([
                api.get('/problems'),
                api.get('/problems/folders')
            ]);
            setProblems(problemsRes.data);
            setFolders(foldersRes.data);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, []);

  const filteredProblems = problems.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.topic.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      const matchesFolder = !folderFilter || p.topic === folderFilter;
      return matchesSearch && matchesDifficulty && matchesFolder;
  });

  const handleDelete = async (id) => {
      if(!window.confirm("Delete this problem?")) return;
      try {
          await api.delete(`/problems/${id}`);
          setProblems(problems.filter(p => p._id !== id));
      } catch (err) {
          console.error("Failed to delete", err);
      }
  }

  const handleDownload = async (problemId) => {
    try {
      const response = await api.get(`/export/problems/${problemId}/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `problem-${problemId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download PDF", err);
      alert("Failed to download PDF. Please try again.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
              <div className="flex-1">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-500 to-pink-500 bg-clip-text text-transparent mb-3">My Problems</h1>
                  <p className="text-gray-600 text-lg font-medium">Organize and master your DSA vault</p>
              </div>
              <motion.button 
                  onClick={() => navigate('/upload')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-full font-bold transition-all shadow-lg"
              >
                  <Plus className="w-5 h-5" />
                  Add Problem
              </motion.button>
          </motion.div>

          {/* Search & Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-orange-100"
          >
               <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                      type="text" 
                      placeholder="Search problems, tags..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  />
               </div>
               
               <div className="flex gap-3">
                   <div className="relative">
                      <button
                          onClick={() => {
                              setShowDifficultyMenu(!showDifficultyMenu);
                              setShowFolderMenu(false);
                          }}
                          className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border-2 border-gray-200 text-gray-700 text-sm font-semibold cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-all"
                      >
                          <Filter className="w-4 h-4" />
                          {difficultyFilter === 'All' ? 'All Levels' : difficultyFilter}
                      </button>
                      {showDifficultyMenu && (
                          <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-2xl border-2 border-gray-100 shadow-xl z-10">
                              {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
                                  <button
                                      key={difficulty}
                                      onClick={() => {
                                          setDifficultyFilter(difficulty);
                                          setShowDifficultyMenu(false);
                                      }}
                                      className={`w-full text-left px-4 py-3 text-sm font-semibold ${
                                          difficultyFilter === difficulty
                                              ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white'
                                              : 'text-gray-700 hover:bg-orange-50'
                                      } transition-all first:rounded-t-2xl last:rounded-b-2xl`}
                                  >
                                      {difficulty}
                                  </button>
                              ))}
                          </div>
                      )}
                   </div>
                   
                   {folderFilter && (
                      <motion.button
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          onClick={() => {
                              setFolderFilter(null);
                              setDifficultyFilter('All');
                          }}
                          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-sm font-bold cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
                      >
                          <Folder className="w-4 h-4" />
                          {folderFilter} ✕
                      </motion.button>
                   )}
               </div>
          </motion.div>

          {/* Folders Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
               <h3 className="text-2xl font-bold text-gray-800">Folders</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                   {folders.map((folder, i) => (
                       <motion.div 
                           key={i} 
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.05 }}
                           whileHover={{ scale: 1.05, y: -5 }}
                           onClick={() => setFolderFilter(folder.topic)}
                           className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 p-5 rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group"
                       >
                           <div className="p-4 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-2xl group-hover:from-purple-500 group-hover:to-pink-500 transition-all text-white shadow-md">
                               <Folder className="w-6 h-6" />
                           </div>
                           <div>
                               <h4 className="font-bold text-gray-800 text-sm">{folder.topic}</h4>
                               <p className="text-xs text-gray-500 mt-1 font-semibold">{folder.count} problems</p>
                           </div>
                       </motion.div>
                   ))}
                   {folders.length === 0 && !loading && (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-200">
                            <Folder className="w-12 h-12 mx-auto mb-3 opacity-40" />
                            <p className="font-semibold">No folders yet</p>
                            <p className="text-sm mt-1">Upload your first problem to get started</p>
                        </div>
                   )}
               </div>
          </motion.div>

          {/* Problems Grid */}
          {folderFilter && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
              <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">Problems ({filteredProblems.length})</h3>
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md">
                      <Folder className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold text-white">{folderFilter}</span>
                      <button onClick={() => setFolderFilter(null)} className="ml-1 text-white hover:opacity-70 font-bold text-lg">×</button>
                  </div>
              </div>
              
              {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1,2,3].map(i => (
                          <div key={i} className="h-80 bg-white/60 backdrop-blur-sm rounded-3xl animate-pulse border-2 border-orange-100"></div>
                      ))}
                  </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence>
                          {filteredProblems.map((problem, idx) => (
                              <motion.div
                                  key={problem._id}
                                  layout
                                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ y: -8, scale: 1.02 }}
                                  className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col h-full group"
                              >
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="flex-1">
                                          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">{problem.title}</h3>
                                          <div className="flex gap-2 items-center flex-wrap">
                                              <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                                                  problem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                                                  problem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                                                  'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                                              }`}>
                                                  {problem.difficulty}
                                              </span>
                                              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200">
                                                  {problem.language}
                                              </span>
                                          </div>
                                      </div>
                                      <div className="relative">
                                          <button 
                                              onClick={(e) => { 
                                                  e.stopPropagation(); 
                                                  setOpenDropdown(openDropdown === problem._id ? null : problem._id);
                                              }}
                                              className="text-gray-500 hover:text-orange-600 transition-colors p-2 hover:bg-orange-50 rounded-xl"
                                          >
                                              <MoreVertical className="w-5 h-5" />
                                          </button>
                                          
                                          {openDropdown === problem._id && (
                                              <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border-2 border-gray-100 z-10 py-2">
                                                  <Link
                                                      to={`/problems/${problem._id}`}
                                                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all font-semibold"
                                                      onClick={() => setOpenDropdown(null)}
                                                  >
                                                      <Eye className="w-4 h-4" />
                                                      View Details
                                                  </Link>
                                                  <button
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleDownload(problem._id);
                                                          setOpenDropdown(null);
                                                      }}
                                                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-semibold"
                                                  >
                                                      <Download className="w-4 h-4" />
                                                      Download PDF
                                                  </button>
                                                  <button
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleDelete(problem._id);
                                                          setOpenDropdown(null);
                                                      }}
                                                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all font-semibold"
                                                  >
                                                      <Trash2 className="w-4 h-4" />
                                                      Delete
                                                  </button>
                                              </div>
                                          )}
                                      </div>
                                  </div>

                                  <div className="flex gap-3 mb-4">
                                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-200">
                                          <Clock className="w-4 h-4 text-orange-600" />
                                          <span className="text-xs font-bold text-gray-800">{problem.timeComplexity || 'O(n)'}</span>
                                      </div>
                                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                                          <Zap className="w-4 h-4 text-purple-600" />
                                          <span className="text-xs font-bold text-gray-800">{problem.spaceComplexity || 'O(1)'}</span>
                                      </div>
                                  </div>

                                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 mb-4 flex-grow border border-orange-100">
                                      <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                                          {problem.intuition || problem.description}
                                      </p>
                                  </div>

                                  <div className="flex flex-wrap gap-2 mb-4">
                                      <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg text-xs font-bold shadow-sm">
                                          {problem.topic}
                                      </span>
                                      {problem.tags.slice(0, 2).map(t => (
                                          <span key={t} className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-xs text-gray-600 font-semibold">
                                              {t}
                                          </span>
                                      ))}
                                  </div>

                                  <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                       <span className="font-semibold">{problem.language} • {new Date(problem.createdAt).toLocaleDateString()}</span>
                                       <Link 
                                          to={`/problems/${problem._id}`} 
                                          className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-full font-bold transition-all shadow-md"
                                       >
                                          View <ArrowRight className="w-3 h-3" />
                                       </Link>
                                  </div>
                              </motion.div>
                          ))}
                      </AnimatePresence>
                  </div>
              )}
              
              {!loading && filteredProblems.length === 0 && (
                  <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-200"
                  >
                      <p className="text-gray-800 font-bold text-lg">No problems found</p>
                      <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
                  </motion.div>
              )}
          </motion.div>
          )}

        </div>
      </div>
    </>
  );
};

export default Problems;
