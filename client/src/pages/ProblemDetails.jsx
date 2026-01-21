import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Database, Calendar, Tag, CheckCircle } from 'lucide-react';
import api from '../services/api';

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) {
     return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
     );
  }

  if (!problem) {
      return (
          <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-slate-800">Problem not found</h2>
              <button onClick={() => navigate('/problems')} className="mt-4 text-primary hover:underline">Go back to problems</button>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/problems')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Problems
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
           {/* Header */}
           <div className="p-8 border-b border-slate-100 bg-white">
              <div className="flex items-start justify-between">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-slate-900">{problem.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                            problem.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-100' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                            'bg-red-50 text-red-700 border-red-100'
                        }`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-slate-500 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Tag className="w-4 h-4" />
                            {problem.topic}
                        </span>
                        <span className="flex items-center gap-1.5">
                           <Calendar className="w-4 h-4" />
                           {new Date(problem.createdAt).toLocaleDateString()}
                        </span>
                        {problem.isSolved && (
                            <span className="flex items-center gap-1.5 text-green-600 font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Solved
                            </span>
                        )}
                    </div>
                 </div>
                 
                 <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span className="font-mono">{problem.timeComplexity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Database className="w-4 h-4 text-purple-500" />
                        <span className="font-mono">{problem.spaceComplexity}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* Left: Problem & Intuition */}
              <div className="lg:col-span-2 p-8 space-y-8">
                 <section>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Problem Statement</h3>
                    <div className="prose prose-slate max-w-none text-slate-700">
                        <p className="whitespace-pre-wrap">{problem.description}</p>
                    </div>
                 </section>

                 <section>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-500 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Intuition & Approach
                    </h3>
                    <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 text-slate-700 leading-relaxed">
                        {problem.intuition}
                    </div>
                 </section>
              </div>

              {/* Right: Code */}
              <div className="p-8 bg-slate-50/50">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Your Solution</h3>
                 <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
                    <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-mono">{problem.language}</span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                        </div>
                    </div>
                    <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto custom-scrollbar">
                        <code>{problem.code}</code>
                    </pre>
                 </div>

                 <div className="mt-8">
                    <h4 className="text-sm font-medium text-slate-900 mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {problem.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-600 shadow-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
