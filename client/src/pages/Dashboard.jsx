import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  Code, Calendar, Clock, Trophy, 
  ArrowUpRight, TrendingUp, Activity, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const COLORS = ['#6366F1', '#FB923C', '#A3E4D7']; // Indigo, Orange, Mint
const TOPIC_COLORS = ['#6366F1', '#FB923C', '#C4B5FD', '#A3E4D7', '#F59E0B', '#10B981'];

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [topics, setTopics] = useState([]);
  const [trend, setTrend] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, topicsRes, trendRes, recentRes] = await Promise.all([
          api.get('/dashboard/summary'),
          api.get('/dashboard/topics'),
          api.get('/dashboard/complexity-trend'),
          api.get('/problems/recent?limit=5')
        ]);
        
        setSummary(summaryRes.data);
        setTopics(topicsRes.data);
        setTrend(trendRes.data);
        setRecentProblems(recentRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-border-light border-t-brand"></div>
      </div>
    );
  }

  const difficultyData = [
    { name: 'Easy', value: summary?.easy || 0 },
    { name: 'Medium', value: summary?.medium || 0 },
    { name: 'Hard', value: summary?.hard || 0 },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ x: [-100, 1500], y: [0, 100, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-0"
        >
          <div className="w-32 h-20 bg-white/30 rounded-full blur-xl"></div>
        </motion.div>
        <motion.div
          animate={{ x: [-200, 1600], y: [0, -80, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 left-0"
        >
          <div className="w-40 h-24 bg-white/25 rounded-full blur-xl"></div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Track your progress and celebrate your wins</p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="TOTAL PROBLEMS" 
            value={summary?.totalProblems || 0} 
            icon={<Code className="w-6 h-6" />}
            trend="→ 12 this week"
            bgColor="bg-gradient-to-br from-purple-100 to-purple-200"
            iconBg="bg-purple-500"
          />
          <StatCard 
            title="THIS WEEK" 
            value={summary?.thisWeek || 0} 
            icon={<Calendar className="w-6 h-6" />}
            bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
            iconBg="bg-blue-500"
          />
          <StatCard 
            title="AVG COMPLEXITY" 
            value={summary?.avgTimeComplexity || "O(n^2)"} 
            icon={<Clock className="w-6 h-6" />}
            bgColor="bg-gradient-to-br from-orange-100 to-orange-200"
            iconBg="bg-orange-500"
          />
          <StatCard 
            title="STREAK" 
            value={`${summary?.streak || 0} days`} 
            icon={<Trophy className="w-6 h-6" />}
            trend="→ 7 day streak!"
            bgColor="bg-gradient-to-br from-yellow-100 to-yellow-200"
            iconBg="bg-yellow-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Difficulty Distribution */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm border-2 border-purple-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Problems by Difficulty</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #E5E7EB', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 ml-8">
                {difficultyData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm font-semibold text-gray-700">{entry.name}: <span className="text-gray-900">{entry.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Topics Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm border-2 border-orange-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Most Practiced Topics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="topic" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #E5E7EB', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    cursor={{fill: 'rgba(99, 102, 241, 0.1)'}} 
                  />
                  <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                    {topics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Problems */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm border-2 border-blue-100 p-8 rounded-3xl shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Problems</h3>
          <div className="space-y-3">
            {recentProblems.length > 0 ? (
              recentProblems.map((problem, index) => (
                <motion.div 
                  key={problem._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all group"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {problem.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className={`px-3 py-1.5 rounded-full font-bold shadow-sm ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        problem.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                        {problem.topic}
                      </span>
                      <span className="text-gray-500 font-medium">
                        {new Date(problem.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    {problem.timeComplexity && (
                      <div className="text-sm text-gray-700 font-mono bg-blue-50 px-3 py-1 rounded-lg">
                         ⏱️ {problem.timeComplexity}
                      </div>
                    )}
                     {problem.spaceComplexity && (
                      <div className="text-sm text-gray-700 font-mono bg-purple-50 px-3 py-1 rounded-lg">
                         💾 {problem.spaceComplexity}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
               <div className="text-center py-16 text-gray-500">
                  <p className="text-lg font-semibold">No problems solved yet.</p>
                  <p className="text-sm mt-2">Start by uploading your first problem!</p>
               </div>
            )}
          </div>
        </motion.div>

      </div>
      </div>
    </>
  );
};

const StatCard = ({ title, value, icon, trend, bgColor, iconBg }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`${bgColor} p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-2 border-white/50 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            {title}
          </p>
          <h3 className="text-4xl font-black text-gray-900 mb-3">
            {value}
          </h3>
          {trend && (
            <p className="flex items-center text-sm font-bold text-purple-600">
              {trend}
            </p>
          )}
        </div>
        <div className={`${iconBg} p-4 rounded-2xl shadow-lg text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
