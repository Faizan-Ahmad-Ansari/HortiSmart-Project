import React, { useState, useEffect } from 'react';
import { getMarketPrices, updateMarketData } from '../services/marketService';
import { Search, Filter, ArrowUpDown, ChevronRight, TrendingUp, TrendingDown, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';

const MarketPrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMarketPrices();
      setPrices(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch market prices. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await updateMarketData();
      await fetchData();
      // Show a temporary success message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-black uppercase tracking-widest text-[10px] z-50 animate-in slide-in-from-bottom-4';
      toast.innerText = 'Market Data Synced Successfully!';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-4');
        setTimeout(() => toast.remove(), 500);
      }, 3000);
    } catch (err) {
      setError('Failed to update market data.');
    } finally {
      setUpdating(false);
    }
  };

  const filteredData = prices.filter(item => 
    (filterType === 'All' || item.type === filterType) &&
    (item.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Market Prices</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time horticultural crop prices across Mandis.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleUpdate}
            disabled={updating}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary-200 hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${updating ? 'animate-spin' : ''}`} />
            {updating ? 'Updating...' : 'Update Data'}
          </button>
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search crop or location..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-none transition-all dark:text-slate-200 dark:placeholder-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Tabs / Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {['All', 'Vegetable', 'Fruit'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filterType === type 
                ? 'bg-primary-600 text-white shadow-md shadow-primary-200 dark:shadow-none' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          <p className="text-slate-500 font-medium">Fetching latest prices...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-slate-700 dark:text-slate-300 font-bold">{error}</p>
          <button onClick={fetchData} className="text-primary-600 font-bold hover:underline">Try Again</button>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium">No results found for "{searchTerm}"</p>
        </div>
      ) : (
        <>
          {/* Table - Desktop */}
          <div className="hidden md:block overflow-hidden glass-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Crop Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Price (₹/kg)</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Trend</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Last Updated</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredData.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{item.crop}</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-primary-700 dark:text-primary-400">₹{item.price}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{item.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 font-bold text-xs ${
                        (item.trend || '+0%').startsWith('+') ? 'text-primary-600 dark:text-primary-400' : 'text-red-500 dark:text-red-400'
                      }`}>
                        {(item.trend || '+0%').startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {item.trend || 'Stable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 dark:text-slate-500 text-xs font-medium">
                      {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 group-hover:text-primary-600 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredData.map((item) => (
              <div key={item._id || item.id} className="glass-card p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.crop}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-primary-700 dark:text-primary-400">₹{item.price}<span className="text-xs font-normal text-slate-400 dark:text-slate-500 ml-1">/kg</span></span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800">
                  <span className={`inline-flex items-center gap-1 font-bold text-xs ${
                    (item.trend || '+0%').startsWith('+') ? 'text-primary-600 dark:text-primary-400' : 'text-red-500 dark:text-red-400'
                  }`}>
                    {(item.trend || '+0%').startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {item.trend || 'Stable'}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                    {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MarketPrices;
