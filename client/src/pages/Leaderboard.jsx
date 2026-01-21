import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Users, Target, Zap, Activity } from 'lucide-react';
import api from '../services/api';

const Leaderboard = () => {
  const [data, setData] = useState({ stats: null, leaderboard: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/leaderboard');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-slate-400 fill-slate-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-700 fill-amber-700" />;
      default: return <span className="font-bold text-slate-400">#{rank}</span>;
    }
  };

  const getBadge = (user) => {
      if (user.rank === 1) return { text: "Expert", color: "bg-indigo-100 text-indigo-700" };
      if (user.streak > 10) return { text: "Streak Master", color: "bg-red-100 text-red-700" };
      if (user.problemsSolved > 100) return { text: "Problem Solver", color: "bg-green-100 text-green-700" };
      return { text: "Algorithm Master", color: "bg-slate-100 text-slate-700" };
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
                <p className="text-slate-500">See how you stack up against other CodeIntuit users</p>
            </div>
            <div className="flex gap-2">
                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Global Ranking
                 </button>
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
                title="Total Users" 
                value={data.stats?.totalUsers || 0} 
                trend="+12% this month"
                icon={<Users className="w-5 h-5 text-blue-600" />}
                chartColor="bg-blue-500"
            />
            <StatCard 
                title="Problems Solved" 
                value={data.stats?.totalProblemsSolved || 0} 
                trend="+5% this week"
                icon={<Target className="w-5 h-5 text-indigo-600" />}
                chartColor="bg-indigo-500"
            />
             <StatCard 
                title="Active Today" 
                value={data.stats?.activeToday || 0} 
                trend="Peak at 2PM"
                icon={<Zap className="w-5 h-5 text-yellow-600" />}
                chartColor="bg-yellow-500"
            />
             <StatCard 
                title="Avg Difficulty" 
                value={data.stats?.avgDifficulty || 'N/A'} 
                trend="Increasing trend"
                icon={<Activity className="w-5 h-5 text-green-600" />}
                chartColor="bg-green-500"
            />
        </div>


        {loading ? (
             <div className="flex justify-center p-12">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
             </div>
        ) : (
          <div className="space-y-4">
             {/* Leaderboard Entries as Cards */}
             {data.leaderboard.map((user, index) => {
                 const badge = getBadge(user);
                 return (
                    <motion.div 
                        key={user.userId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 flex-shrink-0">
                                {getRankIcon(user.rank)}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-indigo-200 shadow-lg">
                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-900 text-lg">{user.name || 'Unknown User'}</h3>
                                        {index < 3 && <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Top 3</span>}
                                    </div>
                                    <p className="text-slate-400 text-sm">@{user.name?.toLowerCase().replace(' ', '_') || 'user'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Middle */}
                        <div className="flex flex-wrap items-center gap-8 md:gap-16 w-full md:w-auto justify-between md:justify-center">
                            <div className="text-center">
                                <h4 className="text-xl font-bold text-slate-900">{user.problemsSolved}</h4>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Problems</p>
                            </div>
                            <div className="text-center">
                                <h4 className={`text-xl font-bold ${
                                    user.avgDifficulty === 'Hard' ? 'text-red-500' :
                                    user.avgDifficulty === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                                }`}>{user.avgDifficulty}</h4>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Avg Diff</p>
                            </div>
                            <div className="text-center hidden sm:block">
                                <h4 className="text-xl font-bold text-slate-900">{user.accuracy}</h4>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Accuracy</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-orange-500 text-sm">🔥</span>
                                    <h4 className="text-xl font-bold text-slate-900">{user.streak}</h4>
                                </div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Streak</p>
                            </div>
                        </div>

                        {/* Tags Right */}
                        <div className="flex gap-2 w-full md:w-auto justify-start md:justify-end">
                             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                                {badge.text}
                             </span>
                        </div>

                    </motion.div>
                 );
             })}
             
             {data.leaderboard.length === 0 && (
                 <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                     <p className="text-slate-500">No active users yet. Be the first!</p>
                 </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 bg-slate-50 rounded-xl">
                 {icon}
             </div>
             <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                 {trend}
             </span>
        </div>
        <div>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">{title}</p>
        </div>
    </div>
);

export default Leaderboard;
