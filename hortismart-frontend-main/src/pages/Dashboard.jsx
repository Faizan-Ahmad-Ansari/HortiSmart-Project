import React, { useState, useEffect } from 'react';
import { getMarketPrices, getUniqueCrops } from '../services/marketService';
import { getStorageData } from '../services/storageService';
import { getPrediction } from '../services/predictionService';
import { TrendingUp, MapPin, Bell, Sprout, LineChart, Loader2, AreaChart as AreaChartIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import NotificationItem from '../components/NotificationItem';

const Dashboard = () => {
  const [stats, setStats] = useState({
    topCrop: { price: 0, crop: 'Loading...', location: '...', trend: '+0%' },
    storageCount: 0,
    predictions: []
  });
  const [selectedTrendCrop, setSelectedTrendCrop] = useState('Tomato');
  const [availableCrops, setAvailableCrops] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) setUserName(user.name);

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [prices, storages, predictData, crops] = await Promise.all([
          getMarketPrices(),
          getStorageData(),
          getPrediction(selectedTrendCrop),
          getUniqueCrops()
        ]);

        if (crops.length > 0) {
          setAvailableCrops(crops);
          // If current selected crop is not in the list, default to the first one
          if (!crops.includes(selectedTrendCrop)) {
            setSelectedTrendCrop(crops[0]);
          }
        }

        if (prices.length > 0) {
          const sorted = [...prices].sort((a, b) => b.price - a.price);
          setStats(prev => ({ 
            ...prev, 
            topCrop: sorted[0],
            storageCount: storages.length,
            predictions: predictData.predictions
          }));
        }
      } catch (err) {
        console.error('Dashboard data fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [selectedTrendCrop]);

  const dummyNotifications = [
    { id: 1, message: 'Tomato prices expected to rise by 15% next week.', time: '2h ago', type: 'price' },
    { id: 2, message: 'New cold storage facility opened in Jaipur.', time: '5h ago', type: 'info' },
    { id: 3, message: 'Daily market report is now available.', time: '1d ago', type: 'info' },
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome back, {userName}!</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening in the market today.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Top Crop Price"
          value={loading ? '...' : `₹${stats.topCrop.price}/kg`}
          subtext={loading ? 'Loading...' : `${stats.topCrop.crop} - ${stats.topCrop.location}`}
          trend={stats.topCrop.trend || '+0%'}
          icon={TrendingUp}
          colorClass="border-l-primary-500"
        />

        <StatCard 
          title="Storage Near You"
          value={loading ? '...' : `${stats.storageCount} Facilities`}
          subtext="Available within your region"
          icon={MapPin}
          colorClass="border-l-amber-500"
        />

        <StatCard 
          title="Recommended Action"
          value={loading ? '...' : (stats.topCrop.trend && stats.topCrop.trend.startsWith('+') ? 'Good time to sell' : 'Hold your crop')}
          subtext={loading ? 'Analyzing...' : `Based on ${stats.topCrop.crop} trend`}
          icon={Sprout}
          colorClass="border-l-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Price Trend Placeholder */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 italic tracking-tight">Market Price Trends</h2>
            <select 
              value={selectedTrendCrop}
              onChange={(e) => setSelectedTrendCrop(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none transition-all cursor-pointer"
            >
              {availableCrops.length > 0 ? (
                availableCrops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))
              ) : (
                <option value="Tomato">Tomato</option>
              )}
            </select>
          </div>
          <div className="h-64 relative">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Fetching Trends...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.predictions}>
                  <defs>
                    <linearGradient id="colorPriceDash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    }}
                    itemStyle={{ fontWeight: 700, fontSize: '12px' }}
                    labelStyle={{ fontWeight: 800, fontSize: '12px', color: '#1e293b' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#22c55e" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorPriceDash)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Market Insights</h2>
          </div>
          <div className="space-y-4">
            {dummyNotifications.map((note) => (
              <NotificationItem 
                key={note.id} 
                message={note.message} 
                time={note.time} 
                type={note.type} 
              />
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-primary-600 font-bold text-sm hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
