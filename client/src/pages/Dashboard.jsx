import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Code, Calendar, Clock, Trophy, 
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import api from '../services/api';

const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // Easy, Medium, Hard
const TOPIC_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const difficultyData = [
    { name: 'Easy', value: summary?.easySolved || 0 },
    { name: 'Medium', value: summary?.mediumSolved || 0 },
    { name: 'Hard', value: summary?.hardSolved || 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Track your progress and analyze your coding journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title="Total Problems" 
            value={summary?.totalSolved || 0} 
            icon={<Code className="text-blue-600" />}
            trend="+5 this week" // Mock trend for now
          />
          <StatCard 
            title="Avg Time Complexity" 
            value={summary?.avgTimeComplexity || "N/A"} 
            icon={<Clock className="text-purple-600" />}
          />
          <StatCard 
            title="Streak" 
            value={`${summary?.streak || 0} days`} 
            icon={<Trophy className="text-yellow-600" />}
          />
           <StatCard 
            title="This Month" 
            value={summary?.monthlySolved || 0} 
            icon={<Calendar className="text-green-600" />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Difficulty Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Problems by Difficulty</h3>
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Most Practiced Topics</h3>
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
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Problems</h3>
          <div className="space-y-4">
            {recentProblems.length > 0 ? (
              recentProblems.map((problem) => (
                <div key={problem._id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200">
                  <div>
                    <h4 className="font-medium text-slate-900">{problem.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
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

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
      {trend && (
        <p className="flex items-center text-xs font-medium text-green-600 mt-2">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          {trend}
        </p>
      )}
    </div>
    <div className="p-3 bg-slate-50 rounded-xl">
      {icon}
    </div>
  </div>
);

export default Dashboard;
