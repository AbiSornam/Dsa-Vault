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

const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // Easy, Medium, Hard
const TOPIC_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];

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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  const difficultyData = [
    { name: 'Easy', value: summary?.easy || 0 },
    { name: 'Medium', value: summary?.medium || 0 },
    { name: 'Hard', value: summary?.hard || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track your progress and analyze your coding journey</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Problems" 
            value={summary?.totalProblems || 0} 
            icon={<Code className="w-5 h-5" />}
            trend="12 this week"
            color="indigo"
          />
          <StatCard 
            title="This Week" 
            value={summary?.thisWeek || 0} 
            icon={<Calendar className="w-5 h-5" />}
            color="blue"
          />
          <StatCard 
            title="Avg Complexity" 
            value={summary?.avgTimeComplexity || "O(n)"} 
            icon={<Clock className="w-5 h-5" />}
            color="purple"
          />
          <StatCard 
            title="Streak" 
            value={`${summary?.streak || 0} days`} 
            icon={<Trophy className="w-5 h-5" />}
            trend="7 day streak!"
            color="yellow"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Difficulty Distribution */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">Problems by Difficulty</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 ml-8">
                {difficultyData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Topics Bar Chart */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">Most Practiced Topics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {topics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Problems */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">Recent Problems</h3>
          <div className="space-y-4">
            {recentProblems.length > 0 ? (
              recentProblems.map((problem) => (
                <div key={problem._id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">{problem.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className={`px-2 py-0.5 rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <span>{problem.topic}</span>
                      <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {problem.timeComplexity && (
                      <div className="text-xs text-slate-500 font-mono">
                         ⏱️ {problem.timeComplexity}
                      </div>
                    )}
                     {problem.spaceComplexity && (
                      <div className="text-xs text-slate-500 font-mono mt-1">
                         💾 {problem.spaceComplexity}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
               <div className="text-center py-10 text-slate-500">
                  No problems solved yet. Start by uploading one!
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color = "indigo" }) => {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600"
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">{value}</h3>
          {trend && (
            <p className="flex items-center text-xs font-medium text-green-600 mt-3">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 ${colorClasses[color]} rounded-xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
