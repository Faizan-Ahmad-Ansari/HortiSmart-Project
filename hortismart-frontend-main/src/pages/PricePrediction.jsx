import React, { useState, useEffect } from 'react';
import { getPrediction } from '../services/predictionService';
import { getUniqueCrops } from '../services/marketService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Info, TrendingUp, Calendar, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';

const PricePrediction = () => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [predictions, setPredictions] = useState([]);
  const [availableCrops, setAvailableCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const data = await getPrediction(selectedCrop);
      setPredictions(data.predictions);
      setError(null);
    } catch (err) {
      setError(`Failed to load predictions for ${selectedCrop}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const crops = await getUniqueCrops();
        if (crops.length > 0) {
          setAvailableCrops(crops);
          if (!crops.includes(selectedCrop)) {
            setSelectedCrop(crops[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch crops', err);
      }
    };
    fetchCrops();
  }, []);

  useEffect(() => {
    fetchPredictions();
  }, [selectedCrop]);

  const bestMonth = predictions.length > 0 
    ? predictions.reduce((prev, current) => (prev.price > current.price) ? prev : current, predictions[0]) 
    : { month: '...', price: 0 };

  const firstPrice = predictions.length > 0 ? predictions[0].price : 0;
  const lastPrice = predictions.length > 0 ? predictions[predictions.length - 1].price : 0;
  const trendPercentage = firstPrice > 0 ? Math.round(((lastPrice - firstPrice) / firstPrice) * 100) : 0;
  const trendText = trendPercentage >= 0 ? 'Rising' : 'Falling';

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Advanced Price Prediction</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Smart AI models predicting horticultural prices for the next 12 months.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Select Crop</label>
            <select 
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="block w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-colors"
            >
              {availableCrops.length > 0 ? (
                availableCrops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))
              ) : (
                <>
                  <option value="Tomato">Tomato</option>
                  <option value="Potato">Potato</option>
                  <option value="Onion">Onion</option>
                </>
              )}
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chart Card */}
        <div className="lg:col-span-3 glass-card p-6 overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              12 Month Forecast
              <Info className="w-4 h-4 text-slate-300 dark:text-slate-600" />
            </h2>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                <span className="text-slate-500">Predicted Price</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full relative">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                <p className="text-slate-500 text-sm font-medium">Analyzing trends...</p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6 text-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
                <p className="text-slate-700 dark:text-slate-300 font-bold">{error}</p>
                <button onClick={fetchPredictions} className="text-primary-600 font-bold hover:underline">Try Again</button>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictions}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      padding: '12px'
                    }}
                    itemStyle={{ fontWeight: 700, color: '#15803d' }}
                    labelStyle={{ fontWeight: 800, marginBottom: '4px', color: '#1e293b' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#22c55e" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Prediction Insights */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-primary-600 text-white border-none">
            <h3 className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4">Overall Trend</h3>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black block">{trendText}</span>
                <span className="text-white/60 text-xs font-medium">{trendPercentage >= 0 ? '+' : ''}{trendPercentage}% by {predictions.length > 0 ? predictions[predictions.length-1].month : 'End'}</span>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mt-6 italic">
              "Based on historical data and seasonal patterns, prices are expected to peak during the winter months."
            </p>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-earthy-400 dark:border-l-earthy-600">
            <h3 className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Best Sell Month</h3>
            <div className="flex items-center gap-3">
              <div className="bg-earthy-50 dark:bg-earthy-900/30 p-2 rounded-xl">
                <Calendar className="w-8 h-8 text-earthy-600 dark:text-earthy-400" />
              </div>
              <div>
                <span className="text-2xl font-black block text-slate-800 dark:text-slate-100">{bestMonth.month}</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-0.5 uppercase">
                  Max Profit <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePrediction;
