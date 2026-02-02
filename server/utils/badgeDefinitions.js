// Badge Definitions with requirements and metadata
const BADGE_DEFINITIONS = {
  // PROBLEM COUNT BADGES
  first_problem: {
    id: 'first_problem',
    name: 'First Blood',
    description: 'Solved your first problem!',
    type: 'special',
    tier: 'bronze',
    icon: '🎯',
    color: '#10B981',
    requirement: { type: 'total_problems', count: 1 }
  },
  problem_enthusiast: {
    id: 'problem_enthusiast',
    name: 'Enthusiast',
    description: 'Solved 10 problems',
    type: 'problem_count',
    tier: 'bronze',
    icon: '🌟',
    color: '#CD7F32',
    requirement: { type: 'total_problems', count: 10 }
  },
  problem_expert: {
    id: 'problem_expert',
    name: 'Expert',
    description: 'Solved 50 problems',
    type: 'problem_count',
    tier: 'silver',
    icon: '⭐',
    color: '#C0C0C0',
    requirement: { type: 'total_problems', count: 50 }
  },
  problem_master: {
    id: 'problem_master',
    name: 'Master',
    description: 'Solved 100 problems',
    type: 'problem_count',
    tier: 'gold',
    icon: '🏆',
    color: '#FFD700',
    requirement: { type: 'total_problems', count: 100 }
  },
  problem_legend: {
    id: 'problem_legend',
    name: 'Legend',
    description: 'Solved 200 problems',
    type: 'problem_count',
    tier: 'platinum',
    icon: '👑',
    color: '#E5E4E2',
    requirement: { type: 'total_problems', count: 200 }
  },

  // DIFFICULTY BADGES
  easy_starter: {
    id: 'easy_starter',
    name: 'Easy Starter',
    description: 'Solved 10 Easy problems',
    type: 'difficulty',
    tier: 'bronze',
    icon: '🟢',
    color: '#10B981',
    requirement: { type: 'difficulty', difficulty: 'Easy', count: 10 }
  },
  easy_master: {
    id: 'easy_master',
    name: 'Easy Master',
    description: 'Solved 50 Easy problems',
    type: 'difficulty',
    tier: 'silver',
    icon: '💚',
    color: '#10B981',
    requirement: { type: 'difficulty', difficulty: 'Easy', count: 50 }
  },
  medium_champion: {
    id: 'medium_champion',
    name: 'Medium Champion',
    description: 'Solved 25 Medium problems',
    type: 'difficulty',
    tier: 'silver',
    icon: '🟡',
    color: '#F59E0B',
    requirement: { type: 'difficulty', difficulty: 'Medium', count: 25 }
  },
  medium_legend: {
    id: 'medium_legend',
    name: 'Medium Legend',
    description: 'Solved 75 Medium problems',
    type: 'difficulty',
    tier: 'gold',
    icon: '💛',
    color: '#F59E0B',
    requirement: { type: 'difficulty', difficulty: 'Medium', count: 75 }
  },
  hard_hero: {
    id: 'hard_hero',
    name: 'Hard Hero',
    description: 'Solved 10 Hard problems',
    type: 'difficulty',
    tier: 'gold',
    icon: '🔴',
    color: '#EF4444',
    requirement: { type: 'difficulty', difficulty: 'Hard', count: 10 }
  },
  hard_grandmaster: {
    id: 'hard_grandmaster',
    name: 'Hard Grandmaster',
    description: 'Solved 50 Hard problems',
    type: 'difficulty',
    tier: 'platinum',
    icon: '❤️',
    color: '#EF4444',
    requirement: { type: 'difficulty', difficulty: 'Hard', count: 50 }
  },

  // TOPIC BADGES
  array_ninja: {
    id: 'array_ninja',
    name: 'Array Ninja',
    description: 'Solved 15 Array problems',
    type: 'topic',
    tier: 'silver',
    icon: '🥷',
    color: '#3B82F6',
    requirement: { type: 'topic', topic: 'Arrays', count: 15 }
  },
  graph_guru: {
    id: 'graph_guru',
    name: 'Graph Guru',
    description: 'Solved 15 Graph problems',
    type: 'topic',
    tier: 'silver',
    icon: '🕸️',
    color: '#8B5CF6',
    requirement: { type: 'topic', topic: 'Graphs', count: 15 }
  },
  tree_wizard: {
    id: 'tree_wizard',
    name: 'Tree Wizard',
    description: 'Solved 15 Tree problems',
    type: 'topic',
    tier: 'silver',
    icon: '🌳',
    color: '#10B981',
    requirement: { type: 'topic', topic: 'Trees', count: 15 }
  },
  dp_master: {
    id: 'dp_master',
    name: 'DP Master',
    description: 'Solved 15 Dynamic Programming problems',
    type: 'topic',
    tier: 'gold',
    icon: '🧩',
    color: '#EC4899',
    requirement: { type: 'topic', topic: 'Dynamic Programming', count: 15 }
  },
  backtrack_boss: {
    id: 'backtrack_boss',
    name: 'Backtracking Boss',
    description: 'Solved 10 Backtracking problems',
    type: 'topic',
    tier: 'gold',
    icon: '🔙',
    color: '#F59E0B',
    requirement: { type: 'topic', topic: 'Backtracking', count: 10 }
  },

  // STREAK BADGES
  fire_starter: {
    id: 'fire_starter',
    name: 'Fire Starter',
    description: '7-day solving streak',
    type: 'streak',
    tier: 'bronze',
    icon: '🔥',
    color: '#F97316',
    requirement: { type: 'streak', days: 7 }
  },
  streak_champion: {
    id: 'streak_champion',
    name: 'Streak Champion',
    description: '30-day solving streak',
    type: 'streak',
    tier: 'silver',
    icon: '🔥',
    color: '#EF4444',
    requirement: { type: 'streak', days: 30 }
  },
  unstoppable: {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: '100-day solving streak',
    type: 'streak',
    tier: 'platinum',
    icon: '🔥',
    color: '#DC2626',
    requirement: { type: 'streak', days: 100 }
  },

  // SPECIAL BADGES
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Solved 10 problems between 10 PM - 5 AM',
    type: 'special',
    tier: 'bronze',
    icon: '🦉',
    color: '#6366F1',
    requirement: { type: 'time_range', start: 22, end: 5, count: 10 }
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Solved 10 problems between 5 AM - 9 AM',
    type: 'special',
    tier: 'bronze',
    icon: '🐦',
    color: '#FBBF24',
    requirement: { type: 'time_range', start: 5, end: 9, count: 10 }
  },
  weekend_warrior: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Solved 20 problems on weekends',
    type: 'special',
    tier: 'silver',
    icon: '⚔️',
    color: '#10B981',
    requirement: { type: 'weekend', count: 20 }
  },
  speed_demon: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Solved 5 problems in one day',
    type: 'speed',
    tier: 'gold',
    icon: '⚡',
    color: '#FBBF24',
    requirement: { type: 'daily_count', count: 5 }
  },
  consistency_king: {
    id: 'consistency_king',
    name: 'Consistency King',
    description: 'Solved at least 1 problem for 14 consecutive days',
    type: 'special',
    tier: 'gold',
    icon: '👑',
    color: '#8B5CF6',
    requirement: { type: 'consistency', days: 14 }
  }
};

module.exports = { BADGE_DEFINITIONS };
