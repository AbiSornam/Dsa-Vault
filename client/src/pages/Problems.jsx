import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Folder, Trash2, ArrowRight, Plus, LayoutGrid, Clock, Zap, MoreVertical, Eye, Edit, Download } from 'lucide-react';
import api from '../services/api';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto p-1 bg-indigo-500 rounded-lg hidden md:block" style={{ height: '40px', width: '120px' }}>
                 {/* Placeholder for the purple banner/logo area in screenshot if needed, mostly decoration */}
            </div>
            
            <div className="flex-1 w-full flex justify-between items-center gap-4">
                <div>
                     <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Organize and manage your coding problems</p>
                </div>
                <button 
                    onClick={() => navigate('/upload')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-indigo-200"
                >
                    <Plus className="w-4 h-4" />
                    Add Problem
                </button>
            </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search problems, tags..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-400 dark:focus:border-indigo-500 shadow-sm"
                />
             </div>
             
             <div className="flex gap-2">
                 <div className="relative">
                    <button
                        onClick={() => {
                            setShowDifficultyMenu(!showDifficultyMenu);
                            setShowFolderMenu(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        {difficultyFilter === 'All' ? 'All Difficulties' : difficultyFilter}
                    </button>
                    {showDifficultyMenu && (
                        <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-10">
                            {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
                                <button
                                    key={difficulty}
                                    onClick={() => {
                                        setDifficultyFilter(difficulty);
                                        setShowDifficultyMenu(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm ${
                                        difficultyFilter === difficulty
                                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    } transition-colors first:rounded-t-lg last:rounded-b-lg`}
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    )}
                 </div>
                 
                 <div className="relative">
                    {folderFilter && (
                        <button
                            onClick={() => {
                                setFolderFilter(null);
                                setDifficultyFilter('All');
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-200 dark:border-indigo-800 text-sm font-medium cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                            <Folder className="w-4 h-4" />
                            {folderFilter} ✕
                        </button>
                    )}
                 </div>
                 
                 <div className="p-2 bg-indigo-600 text-white rounded-lg cursor-pointer">
                    <LayoutGrid className="w-5 h-5" />
                 </div>
             </div>
        </div>

        {/* Folders Section */}
        <div className="space-y-4">
             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Folders</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {folders.map((folder, i) => (
                     <div 
                         key={i} 
                         onClick={() => setFolderFilter(folder.topic)}
                         className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center gap-3 group"
                     >
                         <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-slate-500 dark:text-slate-400">
                             <Folder className="w-6 h-6" />
                         </div>
                         <div>
                             <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{folder.topic}</h4>
                             <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{folder.count} problems</p>
                         </div>
                     </div>
                 ))}
                 {folders.length === 0 && !loading && (
                      <div className="col-span-full py-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          No folders yet.
                      </div>
                 )}
             </div>
        </div>

{/* Problems Grid - Only show when a folder is selected */}
        {folderFilter && (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Problems ({filteredProblems.length})</h3>
            
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredProblems.map((problem) => (
                            <motion.div
                                key={problem._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{problem.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                setOpenDropdown(openDropdown === problem._id ? null : problem._id);
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                        
                                        {openDropdown === problem._id && (
                                            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 z-10 py-1">
                                                <Link
                                                    to={`/problems/${problem._id}`}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDownload(problem._id);
                                                        setOpenDropdown(null);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(problem._id);
                                                        setOpenDropdown(null);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-4 text-xs font-medium text-slate-500">
                                    <span className="flex items-center gap-1 text-orange-600">
                                        <Clock className="w-3 h-3" />
                                        {problem.timeComplexity || 'O(n)'}
                                    </span>
                                    <span className="flex items-center gap-1 text-blue-600">
                                        <Zap className="w-3 h-3" />
                                        {problem.spaceComplexity || 'O(1)'}
                                    </span>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-3 mb-4 flex-grow border border-slate-100">
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-mono">
                                        {problem.intuition || problem.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-500 font-medium">
                                        {problem.topic}
                                    </span>
                                    {problem.tags.slice(0, 1).map(t => (
                                        <span key={t} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-500 font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                     <span>{problem.language} • {new Date(problem.createdAt).toLocaleDateString()}</span>
                                     <Link to={`/problems/${problem._id}`} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium">
                                        View <ArrowRight className="w-3 h-3" />
                                     </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
            
            {!loading && filteredProblems.length === 0 && (
                <div className="text-center py-20">
                     <p className="text-slate-500">No problems found. Try adjusting filters.</p>
                </div>
            )}
        </div>
        )}

      </div>
    </div>
  );
};

export default Problems;
