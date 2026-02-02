import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Users, Target, Zap, Activity, Star, TrendingUp } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';

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
      case 1: return <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-lg" />;
      case 2: return <Medal className="w-6 h-6 text-slate-300 fill-slate-300 drop-shadow-lg" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600 fill-amber-600 drop-shadow-lg" />;
      default: return <span className="font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBackground = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 via-yellow-300 to-yellow-500';
      case 2: return 'from-slate-300 via-slate-200 to-slate-400';
      case 3: return 'from-amber-600 via-amber-500 to-amber-700';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  const getBadge = (user) => {
      if (user.rank === 1) return { text: "🏆 Expert", gradient: "from-purple-500 to-pink-500" };
      if (user.streak > 10) return { text: "🔥 Streak Master", gradient: "from-orange-500 to-red-500" };
      if (user.problemsSolved > 100) return { text: "⚡ Problem Solver", gradient: "from-green-500 to-emerald-500" };
      return { text: "💡 Rising Star", gradient: "from-blue-500 to-cyan-500" };
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 p-8 pt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-10 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-10 h-10 text-yellow-300" />
                  <h1 className="text-4xl font-bold text-white">Global Leaderboard</h1>
                </div>
                <p className="text-white/90 text-lg">
                  See how you stack up against top problem solvers
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-shadow"
                >
                  This Month
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-colors"
                >
                  All Time
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                  title="Total Users" 
                  value={data.stats?.totalUsers || 0} 
                  trend="+12% this month"
                  icon={<Users className="w-6 h-6 text-blue-600" />}
                  gradient="from-blue-500 to-cyan-500"
              />
              <StatCard 
                  title="Problems Solved" 
                  value={data.stats?.totalProblemsSolved || 0} 
                  trend="+5% this week"
                  icon={<Target className="w-6 h-6 text-purple-600" />}
                  gradient="from-purple-500 to-pink-500"
              />
              <StatCard 
                  title="Active Today" 
                  value={data.stats?.activeToday || 0} 
                  trend="Peak at 2PM"
                  icon={<Zap className="w-6 h-6 text-yellow-600" />}
                  gradient="from-yellow-500 to-orange-500"
              />
              <StatCard 
                  title="Avg Difficulty" 
                  value={data.stats?.avgDifficulty || 'N/A'} 
                  trend="Increasing trend"
                  icon={<Activity className="w-6 h-6 text-green-600" />}
                  gradient="from-green-500 to-emerald-500"
              />
          </div>

          {loading ? (
               <div className="flex justify-center p-20">
                 <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500"></div>
               </div>
          ) : (
            <div className="space-y-5">
               {/* Top 3 Podium */}
               {data.leaderboard.length >= 3 && (
                 <div className="grid grid-cols-3 gap-4 mb-8">
                   {/* 2nd Place */}
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-200 relative overflow-hidden mt-8"
                   >
                     <div className={`absolute inset-0 bg-gradient-to-br ${getRankBackground(2)} opacity-5`} />
                     <div className="relative z-10 text-center">
                       <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white">
                         {data.leaderboard[1].name?.[0]?.toUpperCase() || 'U'}
                       </div>
                       <div className="mb-2">{getRankIcon(2)}</div>
                       <h3 className="font-bold text-gray-800 text-lg mb-1">{data.leaderboard[1].name}</h3>
                       <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                         {data.leaderboard[1].problemsSolved}
                       </p>
                       <p className="text-gray-500 text-sm">problems solved</p>
                     </div>
                   </motion.div>

                   {/* 1st Place */}
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-yellow-300 relative overflow-hidden"
                   >
                     <div className={`absolute inset-0 bg-gradient-to-br ${getRankBackground(1)} opacity-10`} />
                     <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl" />
                     <div className="relative z-10 text-center">
                       <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mx-auto mb-2" />
                       <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-3xl shadow-2xl border-4 border-white">
                         {data.leaderboard[0].name?.[0]?.toUpperCase() || 'U'}
                       </div>
                       <div className="mb-2">{getRankIcon(1)}</div>
                       <h3 className="font-bold text-gray-800 text-xl mb-1">{data.leaderboard[0].name}</h3>
                       <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                         {data.leaderboard[0].problemsSolved}
                       </p>
                       <p className="text-gray-500 text-sm">problems solved</p>
                     </div>
                   </motion.div>

                   {/* 3rd Place */}
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-200 relative overflow-hidden mt-8"
                   >
                     <div className={`absolute inset-0 bg-gradient-to-br ${getRankBackground(3)} opacity-5`} />
                     <div className="relative z-10 text-center">
                       <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white">
                         {data.leaderboard[2].name?.[0]?.toUpperCase() || 'U'}
                       </div>
                       <div className="mb-2">{getRankIcon(3)}</div>
                       <h3 className="font-bold text-gray-800 text-lg mb-1">{data.leaderboard[2].name}</h3>
                       <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                         {data.leaderboard[2].problemsSolved}
                       </p>
                       <p className="text-gray-500 text-sm">problems solved</p>
                     </div>
                   </motion.div>
                 </div>
               )}

               {/* Rest of Leaderboard */}
               {data.leaderboard.slice(3).map((user, index) => {
                   const badge = getBadge(user);
                   const actualIndex = index + 3;
                   return (
                      <motion.div 
                          key={user.userId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: actualIndex * 0.05 }}
                          whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                          className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-orange-200 transition-all"
                      >
                          <div className="flex items-center gap-6 w-full md:w-auto">
                              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-200 flex-shrink-0">
                                  {getRankIcon(user.rank)}
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                                      {user.name?.[0]?.toUpperCase() || 'U'}
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-gray-800 text-lg">{user.name || 'Unknown User'}</h3>
                                      <p className="text-gray-400 text-sm">@{user.name?.toLowerCase().replace(' ', '_') || 'user'}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Stats Middle */}
                          <div className="flex flex-wrap items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-center">
                              <div className="text-center">
                                  <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">{user.problemsSolved}</h4>
                                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Problems</p>
                              </div>
                              <div className="text-center">
                                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-sm ${
                                      user.avgDifficulty === 'Hard' ? 'bg-red-100 text-red-600' :
                                      user.avgDifficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                  }`}>
                                    {user.avgDifficulty}
                                  </div>
                                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2">Difficulty</p>
                              </div>
                              <div className="text-center hidden sm:block">
                                  <h4 className="text-2xl font-bold text-gray-800">{user.accuracy}</h4>
                                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Accuracy</p>
                              </div>
                              <div className="text-center">
                                  <div className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full border-2 border-orange-200">
                                      <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                                      <h4 className="text-xl font-bold text-orange-600">{user.streak}</h4>
                                  </div>
                                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2">Streak</p>
                              </div>
                          </div>

                          {/* Badge Right */}
                          <div className="flex gap-2 w-full md:w-auto justify-start md:justify-end">
                               <span className={`px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r ${badge.gradient} text-white shadow-lg border-2 border-white/50`}>
                                  {badge.text}
                               </span>
                          </div>

                      </motion.div>
                   );
               })}
               
               {data.leaderboard.length === 0 && (
                   <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                       <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                       <p className="text-gray-400 text-lg">No active users yet. Be the first!</p>
                   </div>
               )}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

const StatCard = ({ title, value, trend, icon, gradient }) => (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 hover:border-orange-200 transition-all"
    >
        <div className="flex justify-between items-start mb-4">
             <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
                 <div className="text-white">
                   {icon}
                 </div>
             </div>
             <div className="flex items-center gap-1.5 text-xs font-bold bg-green-100 text-green-600 px-3 py-1.5 rounded-lg">
                 <TrendingUp className="w-3 h-3" />
                 {trend}
             </div>
        </div>
        <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">{value}</h3>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wide mt-2">{title}</p>
        </div>
    </motion.div>
);

export default Leaderboard;
